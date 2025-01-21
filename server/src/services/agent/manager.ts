import { error } from "elysia";
import prisma from "../../config/prisma";
import { AgentMemoryService } from "./memory";
import { logger } from "../../utils/logger";
import { MemoryType } from "@prisma/client";
import type { AgentConfig } from "../../types/agent";

export class AgentManager {
  AgentMemoryService: AgentMemoryService;

  constructor() {
    this.AgentMemoryService = new AgentMemoryService();
  }

  async isActive(agentId: string): Promise<boolean> {
    try {
      const agent = await prisma.agent.findUnique({
        where: { id: agentId },
      });

      return agent?.isActive ?? false;
    } catch (e) {
      logger.error(`Failed to check if agent is active: ${e}`);
      error(500, "Failed to check if agent is active");
      return false;
    }
  }

  async getAgentConfig(name: string): Promise<AgentConfig | null> {
    try {
      const agent = await prisma?.agent.findUnique({
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

      if (!agent) {
        return null;
      }

      const config: AgentConfig = {
        name: agent.name,
        ownerId: agent.ownerId,
        objective: agent.objective,
        topics: agent.topics,
        style: agent.style as {
          all: string[];
          chat: string[];
          post: string[];
        },
        social: agent.social,
        ticker: agent.ticker,
        description: agent.description,
        imageURL: agent.imageURL,
        adjectives: agent.adjectives,
        bio: agent.memories
          .filter((memory) => memory.type === MemoryType.BIO)
          .map((memory) => memory.content),
        lore: agent.memories
          .filter((memory) => memory.type === MemoryType.LORE)
          .map((memory) => memory.content),
        postExamples: agent.memories
          .filter((memory) => memory.type === MemoryType.POST_EXAMPLE)
          .map((memory) => memory.content),
        isActive: agent.isActive,
      };

      return config;
    } catch (e) {
      logger.error(`Failed to get agent config: ${e}`);
      error(500, "Failed to get agent config");
      return null;
    }
  }

  async isAgentActive(id: string): Promise<boolean> {
    try {
      logger.info(`Checking if agent with id ${id} is active`);

      const agent = await prisma.agent.findUnique({
        where: { id },
      });

      return agent?.isActive ?? false;
    } catch (e) {
      logger.error(`Failed to check if agent is active: ${e}`);
      error(500, "Failed to check if agent is active");
      return false;
    }
  }

  async ifAgentExists(id: string): Promise<boolean> {
    try {
      const agent = await prisma.agent.findUnique({
        where: { id },
      });

      return !!agent;
    } catch (e) {
      logger.error(`Failed to check if agent exists: ${e}`);
      error(500, "Failed to check if agent exists");
      return false;
    }
  }
}
