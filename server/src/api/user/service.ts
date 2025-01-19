import { error, type Context } from "elysia";
import prisma from "../../config/prisma";
import { logger } from "../../utils/logger";
import {
  normalizeWalletAddress,
  validateWalletAddress,
} from "../../utils/validations";
import type { User } from "@prisma/client";
import type { UserCreateDTO, UserUpdateDTO } from "../../types/user";
import { generateRandomName } from "../../utils/nameGenerator";

export class UserService {
  private async findUserByWallet(walletAddress: string): Promise<User | null> {
    try {
      return await prisma?.user.findUnique({
        where: { walletAddress: normalizeWalletAddress(walletAddress) },
      });
    } catch (e) {
      logger.error(`Database error while finding user: ${e}`);
      throw e;
    }
  }

  async createUser(context: Context) {
    const { walletAddress } = context.body as UserCreateDTO;

    if (!validateWalletAddress(walletAddress)) {
      return error(400, {
        error: "Invalid wallet address format",
        message: "Wallet address must be a valid Ethereum address",
      });
    }

    try {
      const normalizedAddress = normalizeWalletAddress(walletAddress);
      const existingUser = await this.findUserByWallet(normalizedAddress);

      if (existingUser) {
        return error(400, {
          error: "User already exists",
          message: `User with wallet address ${walletAddress} already exists`,
        });
      }

      const user = await prisma?.user.create({
        data: {
          walletAddress: normalizedAddress,
          name: generateRandomName(normalizedAddress),
        },
      });

      return {
        message: "User created successfully",
        data: user,
      };
    } catch (e) {
      logger.error(`Failed to create user: ${e}`);
      return error(500, {
        error: "Failed to create user",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async getUser(context: Context) {
    const { walletAddress } = context.params as { walletAddress: string };

    if (!validateWalletAddress(walletAddress)) {
      return error(400, {
        error: "Invalid wallet address format",
        message: "Wallet address must be a valid Ethereum address",
      });
    }

    try {
      const user = await this.findUserByWallet(walletAddress);

      if (!user) {
        return error(404, {
          error: "User not found",
          message: `User with wallet address ${walletAddress} not found`,
        });
      }

      return {
        message: "User found successfully",
        data: user,
      };
    } catch (e) {
      logger.error(`Failed to get user: ${e}`);
      return error(500, {
        error: "Failed to get user",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async updateUser(context: Context) {
    const { walletAddress, name } = context.body as UserUpdateDTO;

    if (!validateWalletAddress(walletAddress)) {
      return error(400, {
        error: "Invalid wallet address format",
        message: "Wallet address must be a valid Ethereum address",
      });
    }

    if (name.length < 3) {
      return error(400, {
        error: "Invalid name",
        message: "Name must be at least 3 characters long",
      });
    }

    try {
      const normalizedAddress = normalizeWalletAddress(walletAddress);
      const existingUser = await this.findUserByWallet(normalizedAddress);

      if (!existingUser) {
        return error(404, {
          error: "User not found",
          message: `User with wallet address ${walletAddress} not found`,
        });
      }

      const user = await prisma?.user.update({
        where: { walletAddress: normalizedAddress },
        data: { name },
      });

      return {
        message: "User updated successfully",
        data: user,
      };
    } catch (e) {
      logger.error(`Failed to update user: ${e}`);
      return error(500, {
        error: "Failed to update user",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }
}
