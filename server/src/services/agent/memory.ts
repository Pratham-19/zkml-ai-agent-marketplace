import prisma from "../../config/prisma";
import { MemoryType } from "@prisma/client";
import type { AgentConfig } from "../../types/agent";
import { env } from "../../config/enviroment";
import { logger } from "../../utils/logger";
import { error } from "elysia";

export class AgentMemoryService {
  async upsertAgentConfig(config: AgentConfig) {
    const agent = await prisma?.agent.upsert({
      where: { name: config.name },
      update: {
        objective: config.objective,
        topics: config.topics,
        style: config.style,
        adjectives: config.adjectives,
        social: config.social,
        ticker: config.ticker,
        description: config.description,
        imageURL: config.imageURL,
        isActive: config.isActive ?? false,
        credentials: config.credentials,
      },
      create: {
        name: config.name,
        objective: config.objective,
        topics: config.topics,
        style: config.style,
        social: config.social,
        adjectives: config.adjectives,
        isActive: config.isActive ?? false,
        ownerId: config.ownerId,
        ticker: config.ticker,
        description: config.description,
        imageURL: config.imageURL,
        credentials: config.credentials,
      },
    });

    if (!agent) {
      return null;
    }

    await this.storeMemoriesBatch(agent.id, MemoryType.BIO, config.bio);
    await this.storeMemoriesBatch(agent.id, MemoryType.LORE, config.lore);
    await this.storeMemoriesBatch(
      agent.id,
      MemoryType.POST_EXAMPLE,
      config.postExamples
    );

    return agent;
  }

  private async storeMemoriesBatch(
    agentId: string,
    type: MemoryType,
    contents: string[]
  ) {
    try {
      logger.info(`Storing ${contents.length} memories of type ${type}`);
      const embeddings = await this.getEmbedding(contents);
      const memories = embeddings.map((embedding, index) => {
        return {
          agentId,
          type,
          content: contents[index],
          embedding: embedding.embedding,
        };
      });

      await prisma.agentMemory.createMany({
        data: memories,
        skipDuplicates: true,
      });
    } catch (e) {
      logger.error(`Failed to store memories of type ${type}: ${e}`);
      error(500, `Failed to store memories of type ${type}`);
    }
  }

  async getBotConfig(name: string) {
    try {
      const bot = await prisma?.agent.findUnique({
        where: { name },
        include: {
          memories: {
            where: {
              type: {
                in: [MemoryType.BIO, MemoryType.LORE, MemoryType.POST_EXAMPLE],
              },
            },
          },
        },
      });

      return bot;
    } catch (e) {
      logger.error(`Failed to get bot config: ${e}`);
      error(500, "Failed to get bot config");
    }
  }

  async storeMemory(agentId: string, type: MemoryType, content: string) {
    try {
      const embedding = await this.getEmbedding([content]);
      logger.info(`Storing memory of type ${type}`);
      await prisma.agentMemory.create({
        data: {
          agentId,
          type,
          content,
          embedding: embedding[0].embedding,
        },
      });
    } catch (e) {
      logger.error(`Failed to store memory: ${e}`);
      error(500, "Failed to store memory");
    }
  }

  private async getEmbedding(
    text: string[]
  ): Promise<{ embedding: number[]; index: number }[]> {
    const response = await fetch("https://api.voyageai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({ input: text, model: "voyage-3" }),
    });

    if (!response.ok) {
      logger.error(`Failed to get embeddings: ${response.statusText}`);
      error(500, "Failed to get embeddings");
    }

    const { data } = await response.json();
    return data;
  }

  async findSimilarMemories(agentId: string, query: string, limit: number = 3) {
    try {
      const queryEmbedding = await this.getEmbedding([query]);
      if (!queryEmbedding || queryEmbedding.length === 0) {
        throw new Error("Failed to generate query embedding");
      }

      const result = await prisma.$queryRaw<
        Array<{
          id: string;
          type: MemoryType;
          content: string;
          distance: number;
        }>
      >`
        WITH RankedMemories AS (
          SELECT 
            id,
            type,
            content,
            embedding::vector <=> ${queryEmbedding[0].embedding}::vector as distance,
            ROW_NUMBER() OVER (PARTITION BY type ORDER BY embedding::vector <=> ${queryEmbedding[0].embedding}::vector) as rn
          FROM "AgentMemory"
          WHERE "agentId" = ${agentId}
        )
        SELECT id, type, content, distance
        FROM RankedMemories
        WHERE rn <= ${limit}
        ORDER BY type, distance
      `;

      const organized = {
        bio: result.filter((r) => r.type === MemoryType.BIO),
        lore: result.filter((r) => r.type === MemoryType.LORE),
        postExamples: result.filter((r) => r.type === MemoryType.POST_EXAMPLE),
        generatedResponse: result.filter(
          (r) => r.type === MemoryType.GENERATED_RESPONSE
        ),
      };

      return organized;
    } catch (error) {
      logger.error(`Failed to find similar memories: ${error}`);
      throw new Error("Failed to find similar memories");
    }
  }
}
