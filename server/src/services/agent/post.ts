import { MemoryType } from "@prisma/client";
import { env } from "../../config/enviroment";
import { logger } from "../../utils/logger";
import type { AgentBase } from "./base";
import { AgentMemoryService } from "./memory";
import { ToolService } from "./tools";

export class AgentPostService {
  baseClient: AgentBase;
  toolService: ToolService;
  agentMemory: AgentMemoryService;

  constructor(baseClient: AgentBase) {
    this.baseClient = baseClient;
    this.agentMemory = new AgentMemoryService();
    this.toolService = new ToolService();
  }
  async generatePost(
    agentId: string,
    socialName: string
  ): Promise<string | undefined> {
    const agent = await this.baseClient.getAgentById(agentId);

    if (!agent) {
      logger.error(`No agent found for id: ${agentId}`);
      return;
    }
    const { style, objective, name, ticker, description, topics, adjectives } =
      agent;

    const { bio, lore, postExamples, generatedResponse } =
      await this.agentMemory.findSimilarMemories(agentId, objective, 5);
    const systemPrompt = `
      # Role: ${name} (@${socialName})
      You are ${name}, an expert in ${topics.join(
      ", "
    )}. Your ticker symbol is ${ticker}.
      
      # Background
      ${bio}
      ${lore}
      ${description}
      
      # Writing Style
      - Tone: ${style!.all.join(", ")}
      - Post Style: ${style!.post.join(", ")}
      - Voice: ${adjectives.join(", ")}
      
      # Content Guidelines
      - Focus on ${topics.join(" or ")} without explicitly naming them
      - Length: 1-3 sentences (randomly choose)
      - Single tweet: Max 250 characters
      - For longer messages: Create thread, each tweet under 250 chars
      - Format threads as: Tweet 1 <thread> Tweet 2 <thread> Tweet 3
      - No questions, emojis, or hashtags
      - Write brief, authoritative statements only
      - NEVER include meta-commentary or writing process descriptions
      - NEVER say "Based on" or reference data sources
      - ALWAYS maintain character voice and perspective
      - STRICTLY follow the specified tone and style
      
      # Posts Examples
      ${postExamples}
    
      # Previous Posts Examples
      ${generatedResponse}
      
      # Task
      Write a single twitter post in your unique voice and style. Stay in character at all times without any explanation or commentary or any METATEXT DESCRIBING YOUR TASK FOLLOW WRTITING STYLE AND CONTENT GUIDELINE. If content exceeds 250 chars, break into thread with <thread> separator`;
    const messages = [
      {
        role: "user",
        content:
          "YOU ARE A CRYPTO WIZARD FROM THE GIVE ME TOP NEWS ABOUT CRYTPO WORLD, NEW INVENTION AND ALL ",
        // content: objective,
      },
    ];

    logger.info(`Generating post for agent: ${agentId}`);
    const response = await this.generateLLMResponse(systemPrompt, messages);

    if (!response) {
      logger.error(`Failed to generate response for agent: ${agentId}`);
      return;
    }
    logger.info(`Generated response: ${response}`);
    this.agentMemory.storeMemory(
      agentId,
      MemoryType.GENERATED_RESPONSE,
      response
    );
    return response;
  }

  async generateReply(agentId: string) {
    // img too
  }

  async generateLLMResponse(
    system: string,
    messages: {
      role: string;
      content: any;
    }[]
  ): Promise<string | undefined> {
    logger.info(`Generating response for agent`);
    const req = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "x-api-key": env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system,
        messages,
        tools: this.toolService.getToolsList(),
      }),
    });

    if (!req.ok) {
      const errorData = await req.json().catch(() => null);
      logger.error(`API Error: Status ${req.status} ${req.statusText}`);
      logger.error(`Error details: ${JSON.stringify(errorData)}`);
      return;
    }

    const data = await req.json();

    if (data?.stop_reason !== "tool_use") {
      return data?.content[0]?.text;
    }

    const toolCall = data.content.find(
      (c: { type: string; name: string; tool_id: any }) => c.type === "tool_use"
    );
    if (!toolCall) {
      logger.error("Tool call data missing");
      return;
    }

    logger.debug(`Tool call: ${JSON.stringify(toolCall)}`);
    const toolFunction = this.toolService.getTool(toolCall.name);

    let toolResponse;
    if (!toolFunction) {
      toolResponse = {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolCall.id,
            content: `Error: Tool '${toolCall.name}' not found`,
            is_error: true,
          },
        ],
      };
    } else {
      toolResponse = {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolCall.id,
            content: await toolFunction(toolCall.input),
          },
        ],
      };
    }

    return this.generateLLMResponse(system, [
      ...messages,
      {
        role: "assistant",
        content: data.content,
      },
      toolResponse,
    ]);
  }
}
