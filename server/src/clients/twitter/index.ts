import { logger } from "../../utils/logger";
import { TwitterBaseClient } from "./base";
import { TwitterPostClient } from "./post";

class TweetManger {
  baseClient: TwitterBaseClient;
  postClient: TwitterPostClient;
  constructor() {
    this.baseClient = new TwitterBaseClient({
      TWITTER_EMAIL: Bun.env.TWITTER_EMAIL ?? "",
      TWITTER_PASSWORD: Bun.env.TWITTER_PASSWORD ?? "",
      TWITTER_USERNAME: Bun.env.TWITTER_USERNAME ?? "",
      ENABLE_ACTION_PROCESSING: false,
      MAX_TWEET_LENGTH: 250,
      POST_INTERVAL_MAX: 3 * 60 * 60,
      POST_INTERVAL_MIN: 30 * 60,
      TWITTER_POLL_INTERVAL: 60 * 60,
      TWITTER_RETRY_LIMIT: 3,
      TWITTER_SEARCH_ENABLE: false,
      TWITTER_TARGET_USERS: [],
    });
    this.postClient = new TwitterPostClient(this.baseClient);
  }
}

export const TwitterClient = {
  async start() {
    logger.info("Starting Twitter client");

    const tweetManager = new TweetManger();

    // Login / generate session
    await tweetManager.baseClient.init();

    // Start posting
    await tweetManager.postClient.startPosting();
    // await tweetManager.baseClient.start();
  },
  async stop() {
    logger.info("Stopping Twitter client");

    //TODO - see how to stop the client

    const tweetManager = new TweetManger();

    // Stop posting
    await tweetManager.postClient.stopPosting();
  },
};
