import Elysia, { t } from "elysia";
import { AgentServices } from "./service";
import { SocialType } from "@prisma/client";

const _agentService = new AgentServices();

export const agentRoutes = new Elysia({
  prefix: "/agent",
  tags: ["Agent"],
})
  .post("/create", _agentService.createAgent, {
    body: t.Object({
      name: t.String({
        minLength: 3,
        examples: ["Sage"],
      }),
      ownerId: t.String({}),
      objective: t.String({
        minLength: 5,
        description: "The objective of the agent",
        examples: ["Make the world a better place"],
      }),
      social: t.Enum(SocialType),

      topics: t.Array(
        t.String({
          minLength: 3,
        }),
        {
          description: "The topics the agent is interested in",
        }
      ),
      style: t.Object(
        {
          all: t.Array(t.String({ minLength: 3 })),
          chat: t.Array(t.String({ minLength: 3 })),
          post: t.Array(t.String({ minLength: 3 })),
        },
        {
          description: "The output style of the agent",
        }
      ),
      adjectives: t.Array(t.String({ minLength: 3 }), {
        description: "The adjectives the agent uses to describe itself",
      }),
      bio: t.Array(t.String({ minLength: 3 }), {
        description: "The bio of the agent",
      }),
      lore: t.Array(t.String({ minLength: 3 }), {
        description: "The lore of the agent",
      }),
      postExamples: t.Array(t.String({ minLength: 3 }), {
        description: "The post examples of the agent",
      }),
      credentials: t.String({}),
    }),
  })
  .get("/all", _agentService.getAllAgents)
  .get("/:id", _agentService.getAgentById)
  // .put("/:id", _agentService.updateAgentById, {
  //   body: t.Object({
  //     objective: t.String({
  //       minLength: 5,
  //       description: "The objective of the agent",
  //       examples: ["Make the world a better place"],
  //     }),
  //     social: t.Enum(SocialType),

  //     topics: t.Array(
  //       t.String({
  //         minLength: 3,
  //       }),
  //       {
  //         description: "The topics the agent is interested in",
  //       }
  //     ),
  //     style: t.Object(
  //       {
  //         all: t.Array(t.String({ minLength: 3 })),
  //         chat: t.Array(t.String({ minLength: 3 })),
  //         post: t.Array(t.String({ minLength: 3 })),
  //       },
  //       {
  //         description: "The output style of the agent",
  //       }
  //     ),
  //     adjectives: t.Array(t.String({ minLength: 3 }), {
  //       description: "The adjectives the agent uses to describe itself",
  //     }),
  //     bio: t.Array(t.String({ minLength: 3 }), {
  //       description: "The bio of the agent",
  //     }),
  //     lore: t.Array(t.String({ minLength: 3 }), {
  //       description: "The lore of the agent",
  //     }),
  //     postExamples: t.Array(t.String({ minLength: 3 }), {
  //       description: "The post examples of the agent",
  //     }),
  //   }),
  // })
  .put("/:id/start", _agentService.startAgentById)
  .put("/:id/stop", _agentService.stopAgentById);

//TODO
//4. route to update agent by id
//5. route to delete agent by id
//7. ws route to capture agerntcreated eevent and send to all connected clients
