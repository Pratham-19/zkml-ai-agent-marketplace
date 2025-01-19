import Elysia, { t } from "elysia";
import { AgentServices } from "./service";

const _agentService = new AgentServices();

export const agentRoutes = new Elysia({ prefix: "/agent" }).post(
  "create",
  _agentService.createAgent,
  {
    body: t.Object({
      walletAddress: t.String({
        examples: "0x1234567890",
        pattern: "^0x[a-fA-F0-9]{40}$",
      }),
    }),
  }
);
