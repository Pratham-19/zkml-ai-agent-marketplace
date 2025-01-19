import { error, type Context } from "elysia";
import prisma from "../../config/prisma";
import { logger } from "../../utils/logger";
import { AgentManager } from "../../services/agent/manager";

export class AgentServices {
  agentManager = new AgentManager();

  async createAgent(context: Context) {
    const { walletAddress } = context.body as { walletAddress: string };
    try {
      logger.info(`Upserting user with wallet address: ${walletAddress}`);
      const user = await prisma?.user.upsert({
        where: {
          walletAddress: walletAddress.toLowerCase(),
        },
        update: {},
        create: {
          walletAddress: walletAddress.toLowerCase(),
          name: generateRandomName(walletAddress.toLowerCase()),
          credits: BigInt(0),
        },
      });
      return {
        message: "User registered successfully",
        user: {
          ...user,
          credits: user?.credits.toString(),
        },
      };
    } catch (e) {
      logger.error(`Failed to upsert user: ${e}`);
      return error(500, {
        error: "Failed to register user",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }
}
