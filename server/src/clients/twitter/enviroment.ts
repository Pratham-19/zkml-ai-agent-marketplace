import { z } from "zod";
import { env } from "../../config/enviroment";

const twitterUsernameSchema = z
  .string()
  .min(1, "An X/Twitter Username must be at least 1 character long")
  .max(15, "An X/Twitter Username cannot exceed 15 characters")
  .refine((username) => {
    // Allow wildcard '*' as a special case
    if (username === "*") return true;

    // Twitter usernames can:
    // - Start with digits now
    // - Contain letters, numbers, underscores
    // - Must not be empty
    return /^[A-Za-z0-9_]+$/.test(username);
  }, "An X Username can only contain letters, numbers, and underscores");

/**
 * This schema defines all required/optional environment settings,
 * including new fields like TWITTER_SPACES_ENABLE.
 */
export const twitterEnvSchema = z.object({
  TWITTER_USERNAME: z.string().min(1, "X/Twitter username is required"),
  TWITTER_PASSWORD: z.string().min(1, "X/Twitter password is required"),
  TWITTER_EMAIL: z.string().email("Valid X/Twitter email is required"),
  TWITTER_2FA_SECRET: z.string().optional(),
  TWITTER_SEARCH_ENABLE: z.boolean().default(false),
  MAX_TWEET_LENGTH: z.number().int().default(env.DEFAULT_MAX_TWEET_LENGTH),
  TWITTER_RETRY_LIMIT: z.number().int().default(3),
  TWITTER_POLL_INTERVAL: z.number().int().default(120), //How often (in seconds) the bot should check for interactions
  TWITTER_TARGET_USERS: z.array(twitterUsernameSchema).default([]),
  POST_INTERVAL_MIN: z
    .number()
    .int()
    .default(30 * 60), // in seconds
  POST_INTERVAL_MAX: z
    .number()
    .int()
    .default(3 * 60 * 60), // inn seconds
  ENABLE_ACTION_PROCESSING: z.boolean().default(true),
  //   ACTION_INTERVAL: z.number().int(),
  //   POST_IMMEDIATELY: z.boolean(),
  //   MAX_ACTIONS_PROCESSING: z.number().int(),
  // ACTION_TIMELINE_TYPE: z
  //     .nativeEnum(ActionTimelineType)
  //     .default(ActionTimelineType.ForYou),
  // # Twitter API v2 credentials for tweet and poll functionality
  // TWITTER_API_KEY=               # Twitter API Key
  // TWITTER_API_SECRET_KEY=        # Twitter API Secret Key
  // TWITTER_ACCESS_TOKEN=          # Access Token for Twitter API v2
  // TWITTER_ACCESS_TOKEN_SECRET=   # Access Token Secret for Twitter API v2
});

export type TwitterConfig = z.infer<typeof twitterEnvSchema>;

/**
 * Helper to parse a comma-separated list of Twitter usernames
 * (already present in your code).
 */
function parseTargetUsers(targetUsersStr?: string | null): string[] {
  if (!targetUsersStr?.trim()) {
    return [];
  }
  return targetUsersStr
    .split(",")
    .map((user) => user.trim())
    .filter(Boolean);
}

function safeParseInt(
  value: string | undefined | null,
  defaultValue: number
): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : Math.max(1, parsed);
}
