import Elysia, { t } from "elysia";
import { UserService } from "./service";
import { WALLET_ADDRESS_PATTERN } from "../../utils/validations";

const userService = new UserService();

export const userRoutes = new Elysia({ prefix: "/user", tags: ["User"] })
  .post("/", userService.createUser.bind(userService), {
    body: t.Object({
      walletAddress: t.String({
        pattern: WALLET_ADDRESS_PATTERN.source,
        examples: ["0x1234567890abcdef1234567890abcdef12345678"],
      }),
    }),
  })
  .get("/:walletAddress", userService.getUser.bind(userService), {
    params: t.Object({
      walletAddress: t.String({
        pattern: WALLET_ADDRESS_PATTERN.source,
        examples: ["0x1234567890abcdef1234567890abcdef12345678"],
      }),
    }),
  })
  .put("/", userService.updateUser.bind(userService), {
    body: t.Object({
      walletAddress: t.String({
        pattern: WALLET_ADDRESS_PATTERN.source,
        examples: ["0x1234567890abcdef1234567890abcdef12345678"],
      }),
      name: t.String({
        minLength: 3,
        examples: ["Sage"],
      }),
    }),
  });
