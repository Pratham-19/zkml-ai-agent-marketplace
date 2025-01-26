import { logger } from "../../utils/logger";
import { TwitterBaseClient } from "./base";
import { TwitterPostClient } from "./post";
import { decryptString } from "../../utils/crypto";
import type { ITwitterCredentials } from "../../types/twitter";

class TweetManger {
  baseClient: TwitterBaseClient;
  postClient: TwitterPostClient;
  constructor({
    twitterEmail,
    twitterPassword,
    twitterUsername,
    agentId,
  }: {
    twitterEmail: string;
    twitterPassword: string;
    twitterUsername: string;
    agentId: string;
  }) {
    this.baseClient = new TwitterBaseClient({
      TWITTER_EMAIL: twitterEmail,
      TWITTER_PASSWORD: twitterPassword,
      TWITTER_USERNAME: twitterUsername,
      ENABLE_ACTION_PROCESSING: false,
      MAX_TWEET_LENGTH: 250,
      POST_INTERVAL_MAX: 60 * 60, // 1 hour
      POST_INTERVAL_MIN: 15 * 60, // 10 minutes
      TWITTER_POLL_INTERVAL: 20 * 60, // 20 minutes
      TWITTER_RETRY_LIMIT: 3,
      TWITTER_SEARCH_ENABLE: false,
      TWITTER_TARGET_USERS: [],
    });
    this.postClient = new TwitterPostClient(this.baseClient, agentId);
  }
}

export const TwitterClient = {
  async start(encryptedCredentials: string, agentId: string) {
    logger.info("Starting Twitter client");

    const { email, username, password }: ITwitterCredentials = JSON.parse(
      decryptString(encryptedCredentials)
    );

    if (!email || !username || !password) {
      logger.error("Invalid Twitter credentials");
      return;
    }
    const tweetManager = new TweetManger({
      twitterEmail: email,
      twitterPassword: password,
      twitterUsername: username,
      agentId,
    });

    // Login / generate session
    await tweetManager.baseClient.init();

    // Start posting
    await tweetManager.postClient.startPosting();
    await tweetManager.postClient.startMentionWatch();
    // await tweetManager.baseClient.start();
  },
};
