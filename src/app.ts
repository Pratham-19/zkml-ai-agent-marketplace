import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { logger } from "./utils/logger";
import { env } from "./config/enviroment";
import { healthRoutes } from "./api";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "AURK API Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  .use(healthRoutes)
  .listen(env.PORT);

app.get("/", () => {
  return "Aurk API";
});

logger.info(`🦊 Server running at ${app.server?.hostname}:${env.PORT}`);
