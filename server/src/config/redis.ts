import { Redis } from "@upstash/redis";
import { env } from "./enviroment";

export const redis = new Redis({
  url: env.REDIS_REST_URL,
  token: env.REDIS_REST_TOKEN,
});

// await redis.set("foo", "bar");
// const data = await redis.get("foo");
