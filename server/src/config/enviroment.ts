const NODE_ENV = Bun.env.NODE_ENV || "development";
const PORT = Bun.env.PORT || 8000;
const DEFAULT_MAX_TWEET_LENGTH = 280;
const REDIS_REST_URL = Bun.env.REDIS_REST_URL ?? "";
const REDIS_REST_TOKEN = Bun.env.REDIS_REST_TOKEN ?? "";
const ANON_HTTPS_PROXY = Bun.env.ANON_HTTPS_PROXY ?? "";

export const env = {
  NODE_ENV,
  PORT,
  DEFAULT_MAX_TWEET_LENGTH,
  REDIS_REST_TOKEN,
  REDIS_REST_URL,
  ANON_HTTPS_PROXY,
};
