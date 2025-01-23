import type { CipherGCMTypes } from "crypto";

const NODE_ENV = Bun.env.NODE_ENV || "development";
const PORT = Bun.env.PORT || 8000;
const DEFAULT_MAX_TWEET_LENGTH = 280;
const REDIS_REST_URL = Bun.env.REDIS_REST_URL ?? "";
const REDIS_REST_TOKEN = Bun.env.REDIS_REST_TOKEN ?? "";
const ANON_HTTPS_PROXY = Bun.env.ANON_HTTPS_PROXY ?? "";
const VOYAGE_API_KEY = Bun.env.VOYAGE_API_KEY ?? "";
const ENCRYTPION_ALGORITHM: CipherGCMTypes = "aes-128-gcm";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ?? "";
const ALGORITHM_NONCE_SIZE = 12;
const ALGORITHM_TAG_SIZE = 16;
const ALGORITHM_KEY_SIZE = 16;
const PBKDF2_NAME = "sha256";
const PBKDF2_SALT_SIZE = 16;
const PBKDF2_ITERATIONS = 32767;

export const env = {
  NODE_ENV,
  PORT,
  DEFAULT_MAX_TWEET_LENGTH,
  REDIS_REST_TOKEN,
  REDIS_REST_URL,
  ANON_HTTPS_PROXY,
  VOYAGE_API_KEY,
  ENCRYTPION_ALGORITHM,
  ENCRYPTION_KEY,
  ALGORITHM_NONCE_SIZE,
  ALGORITHM_TAG_SIZE,
  ALGORITHM_KEY_SIZE,
  PBKDF2_NAME,
  PBKDF2_SALT_SIZE,
  PBKDF2_ITERATIONS,
};
