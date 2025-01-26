import { error } from "elysia";
import prisma from "../../config/prisma";
import { logger } from "../../utils/logger";
import type { Agent } from "@prisma/client";
import type { ElysiaCustomStatusResponse } from "elysia/error";
import type { AgentConfig } from "../../types/agent";
import type { UnionType } from "typescript";

export class AgentBase {
  async isActive(agentId: string): Promise<boolean> {
    try {
      logger.info(`Checking if agent with id ${agentId} is active`);
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

  // async getAgentConfig(name: string): Promise<AgentConfig | null> {
  //   try {
  //     const agent = await prisma?.agent.findUnique({
  //       where: { name },
  //       include: {
  //         memories: {
  //           where: {
  //             type: {
  //               in: [MemoryType.BIO, MemoryType.LORE, MemoryType.POST_EXAMPLE],
  //             },
  //           },
  //         },
  //       },
  //     });

  //     if (!agent) {
  //       return null;
  //     }

  //     const config: AgentConfig = {
  //       name: agent.name,
  //       ownerId: agent.ownerId,
  //       objective: agent.objective,
  //       topics: agent.topics,
  //       style: agent.style as {
  //         all: string[];
  //         chat: string[];
  //         post: string[];
  //       },
  //       social: agent.social,
  //       ticker: agent.ticker,
  //       description: agent.description,
  //       imageURL: agent.imageURL,
  //       adjectives: agent.adjectives,
  //       bio: agent.memories
  //         .filter((memory) => memory.type === MemoryType.BIO)
  //         .map((memory) => memory.content),
  //       lore: agent.memories
  //         .filter((memory) => memory.type === MemoryType.LORE)
  //         .map((memory) => memory.content),
  //       postExamples: agent.memories
  //         .filter((memory) => memory.type === MemoryType.POST_EXAMPLE)
  //         .map((memory) => memory.content),
  //       isActive: agent.isActive,
  //     };

  //     return config;
  //   } catch (e) {
  //     logger.error(`Failed to get agent config: ${e}`);
  //     error(500, "Failed to get agent config");
  //     return null;
  //   }
  // }

  async ifExists(id: string): Promise<boolean> {
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

  async getAgentById(agentId: string): Promise<Agent | null> {
    try {
      logger.info(`Fetching agent with id ${agentId}`);
      const agent = await prisma.agent.findUnique({
        where: { id: agentId },
      });
      return agent;
    } catch (e) {
      logger.error(`Failed to get agent by id: ${e}`);
      throw Error("Failed to get agent by id");
    }
  }
}
