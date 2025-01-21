import { error, type Context } from "elysia";
import prisma from "../../config/prisma";
import { logger } from "../../utils/logger";
import { AgentManager } from "../../services/agent/manager";
import type { AgentConfig } from "../../types/agent";
import { SocialType } from "@prisma/client";
import { TwitterClient } from "../../clients/twitter";

export class AgentServices {
  agentManager = new AgentManager();
  async createAgent(context: Context) {
    const {
      adjectives,
      bio,
      lore,
      name,
      objective,
      ownerId,
      postExamples,
      social,
      style,
      topics,
      description,
      imageURL,
      ticker,
    } = context.body as AgentConfig;
    try {
      logger.info(`Checking if agent with name ${name} already exists`);
      const agentExists = await prisma.agent.findUnique({
        where: { name },
      });
      if (agentExists) {
        return error(400, {
          error: "Agent already exists",
          message: `Agent with name ${name} already exists`,
        });
      }

      logger.info(`Checking if user with id ${ownerId} exists`);
      const user = await prisma.user.findUnique({
        where: { id: ownerId },
      });
      if (!user) {
        return error(400, {
          error: "User not found",
          message: `User with id ${ownerId} not found`,
        });
      }

      logger.info(`Creating agent with name ${name}`);

      const agent =
        await this.agentManager.AgentMemoryService.upsertAgentConfig({
          adjectives,
          bio,
          lore,
          name,
          objective,
          ownerId,
          postExamples,
          social,
          style,
          topics,
          description,
          imageURL,
          ticker,
        });

      return {
        message: "Agent created successfully",
        agent,
      };
    } catch (e) {
      logger.error(`Failed to upsert user: ${e}`);
      return error(500, {
        error: "Failed to register user",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async getAllAgents() {
    try {
      logger.info("Fetching all agents");
      const agents = await prisma.agent.findMany();
      return {
        agents,
      };
    } catch (e) {
      logger.error(`Failed to fetch all agents: ${e}`);
      return error(500, {
        error: "Failed to fetch all agents",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async getAgentById(context: Context) {
    const { id } = context.params;
    try {
      const agentExists = await this.agentManager.ifAgentExists(id);
      if (!agentExists) {
        return error(404, {
          error: "Agent not found",
          message: `Agent with id ${id} not found`,
        });
      }
      logger.info(`Fetching agent with id ${id}`);
      const agent = await prisma.agent.findUnique({
        where: { id },
        include: {
          owner: true,
          memories: {
            where: {
              type: {
                in: ["BIO", "LORE", "POST_EXAMPLE"],
              },
            },
          },
        },
      });
      if (!agent) {
        return error(404, {
          error: "Agent not found",
          message: `Agent with id ${id} not found`,
        });
      }

      return {
        agent,
      };
    } catch (e) {
      logger.error(`Failed to fetch agent with id ${id}: ${e}`);
      return error(500, {
        error: "Failed to fetch agent",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async startAgentById(context: Context) {
    const { id } = context.params;
    try {
      const agentExists = await this.agentManager.ifAgentExists(id);
      if (!agentExists) {
        return error(404, {
          error: "Agent not found",
          message: `Agent with id ${id} not found`,
        });
      }

      const agentIsActive = await this.agentManager.isAgentActive(id);
      if (agentIsActive) {
        return error(400, {
          error: "Agent already active",
          message: `Agent with id ${id} is already active`,
        });
      }

      logger.info(`Starting agent with id ${id}`);

      const agent = await prisma.agent.update({
        where: { id },
        data: { isActive: true },
      });

      if (agent.social === SocialType.TWITTER) {
        // Start the Twitter agent
        TwitterClient.start();
      }

      return {
        message: "Agent started successfully",
        agent,
      };
    } catch (e) {
      logger.error(`Failed to start agent with id ${id}: ${e}`);
      return error(500, {
        error: "Failed to start agent",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async stopAgentById(context: Context) {
    const { id } = context.params;
    try {
      const agentExists = await this.agentManager.ifAgentExists(id);
      if (!agentExists) {
        return error(404, {
          error: "Agent not found",
          message: `Agent with id ${id} not found`,
        });
      }
      logger.info(`Stopping agent with id ${id}`);

      const agent = await prisma.agent.update({
        where: { id },
        data: { isActive: false },
      });
      return {
        message: "Agent stopped successfully",
        agent,
      };
    } catch (e) {
      logger.error(`Failed to stop agent with id ${id}: ${e}`);
      return error(500, {
        error: "Failed to stop agent",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }
}
