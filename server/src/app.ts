import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { logger } from "./utils/logger";
import { env } from "./config/enviroment";
import { healthRoutes, testRoutes } from "./api";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Sage API Documentation",
          version: "1.0.0",
          description: "API Documentation for SageOS",
        },
      },
      path: "/docs",
    })
  )
  .use(healthRoutes)
  .use(testRoutes)
  .listen(env.PORT);

app.get("/", () => {
  return "Sage API";
});

logger.info(`🦊 Server running at ${app.server?.hostname}:${env.PORT}`);
