import Elysia from "elysia";
import { TwitterClient } from "../../clients/twitter";

export const testRoutes = new Elysia({ prefix: "/test" })
  .get("/start", () => {
    TwitterClient.start();
  })
  .get("/stop", () => {
    TwitterClient.stop();
  });
