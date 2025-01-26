import { env } from "../../config/enviroment";
import { logger } from "../../utils/logger";

interface ToolSchema {
  name: string;
  description: string;
  input_schema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

interface NewsSchema {
  title: string;
  source: string;
  url: string;
  published_on: number;
  categories: string;
  body: string;
}

export class ToolService {
  private tools: Map<string, Function>;

  constructor() {
    this.tools = new Map();
    this.registerTools();
  }

  private registerTools() {
    this.tools.set("search_web", this.searchWeb.bind(this));
    this.tools.set("get_blockchain_news", this.getBlockchainNews.bind(this));
  }

  getToolsList(): ToolSchema[] {
    return [
      {
        name: "search_web",
        description: "Search web for real-time information",
        input_schema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query to find information",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_blockchain_news",
        description: "Get latest blockchain and crypto news",
        input_schema: {
          type: "object",
          properties: {
            categories: {
              type: "string",
              enum: ["BTC", "ETH", "BLOCKCHAIN"],
              description: "Category of news to fetch",
            },
          },
          required: [],
        },
      },
    ];
  }

  getTool(name: string): Function | undefined {
    const tool = this.tools.get(name);
    return tool;
  }

  private async searchWeb(input: { query: string }): Promise<string> {
    try {
      logger.info(`Searching the web for: ${input.query}`);
      const req = await fetch("https://api.tavily.com/search", {
        method: "POST",
        body: JSON.stringify({
          query: input.query,
          api_key: env.TAVILY_API_KEY,
          max_results: 5,
        }),
      });

      if (!req.ok) {
        logger.error(`Failed to search the web: ${req.statusText}`);
        return `Failed to search the web`;
      }

      const data = await req.json();

      const results = data?.results;
      return JSON.stringify(results);
    } catch (err) {
      logger.error(`Failed to search the web: ${err}`);
      return `Failed to search the web`;
    }
  }

  private async getBlockchainNews(input: { query: string }): Promise<string> {
    try {
      logger.info(`Fetching blockchain news`);
      const req = await fetch(
        "https://min-api.cryptocompare.com/data/v2/news/?categories=ETH",
        {
          headers: {
            Apikey: env.CRYPTOCOMPARE_NEWS_API,
          },
        }
      );

      if (!req.ok) {
        logger.error(`Failed to fetch blockchain news: ${req.statusText}`);
        return `Failed to fetch blockchain news`;
      }

      const data = await req.json();

      const topNews = data?.Data?.slice(6);

      const finalData: NewsSchema[] = topNews.map((news: NewsSchema) => {
        return {
          title: news.title,
          source: news.source,
          url: news.url,
          published_on: news.published_on,
          categories: news.categories,
          body: news.body,
        };
      });

      return JSON.stringify(finalData);
    } catch (err) {
      logger.error(`Failed to fetch blockchain news: ${err}`);
      return `Failed to fetch blockchain news`;
    }
  }
}

// // Updated AgentPostService
// export class AgentPostService {
//   private toolService: ToolService;

//   constructor(baseClient: AgentBase) {
//     this.baseClient = baseClient;
//     this.agentMemory = new AgentMemoryService();
//     this.toolService = new ToolService();
//   }

//   async generateLLMResponse(prompt: string, system: string) {
//     const req = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: {
//         "content-Type": "application/json",
//         "x-api-key": env.CLAUDE_API_KEY,
//         "anthropic-version": "2023-06-01",
//       },
//       body: JSON.stringify({
//         model: "claude-3-5-sonnet-20241022",
//         max_tokens: 1024,
//         system,
//         messages: [
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         tools: this.toolService.getToolsList(),
//       }),
//     });

//     if (!req.ok) {
//       logger.error(`Failed to generate response: ${req.statusText}`);
//       return;
//     }

//     const data = await req.json();

//     if (data?.stop_reason === "tool_use") {
//       const toolCall = data.content[0]?.type === "tool_use" ? data.content[0] : null;
//       if (toolCall) {
//         const toolResult = await this.toolService.executeTool(
//           toolCall.name,
//           toolCall.input
//         );

//         // Make another API call with tool result
//         return this.generateLLMResponse(prompt, system, [
//           {
//             role: "assistant",
//             content: data.content
//           },
//           {
//             role: "user",
//             content: [{
//               type: "tool_result",
//               tool_use_id: toolCall.id,
//               content: toolResult
//             }]
//           }
//         ]);
//       }
//     }

//     return data?.content[0]?.text;
//   }
// }
