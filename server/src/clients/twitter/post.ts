import { AgentManager } from "../../services/agent/manager";
import { logger } from "../../utils/logger";
import type { TwitterBaseClient } from "./base";

export class TwitterPostClient {
  baseClient: TwitterBaseClient;
  agentManager: AgentManager;
  agentId;

  constructor(baseClient: TwitterBaseClient, agentId: string) {
    this.baseClient = baseClient;
    this.agentManager = new AgentManager();
    this.agentId = agentId;
  }

  async startPosting() {
    logger.info("Starting Twitter client");

    const postTweet = async () => {
      const agentId = this.agentId;

      if (!agentId) {
        logger.error("No agent found");
        return;
      }

      logger.debug(`Checking if agent is active for agentId: ${agentId}`);
      const isActive = await this.agentManager.agentBase.isActive(agentId);

      if (!isActive) {
        logger.error("Agent is not active");
        return;
      }

      logger.debug("Checking if logged in");

      const isLoggedIn = await this.baseClient.twitterScraper.isLoggedIn();
      if (!isLoggedIn) {
        logger.error("Not logged in");
        const isAutheticated = await this.baseClient.init();
        if (!isAutheticated) {
          logger.error("Failed to authenticate");
          return;
        }
      }

      const content = await this.agentManager.postClient.generatePost(
        this.agentId,
        this.baseClient.twitterConfig.TWITTER_USERNAME
      );

      if (!content) {
        logger.error("Failed to generate tweet");
        return;
      }

      if (content.includes("<thread>")) {
        const tweets = content.split("<thread>");
        let previousTweetId: string | null = null;

        for (const tweet of tweets) {
          if (!previousTweetId) {
            const response = await this.baseClient.twitterScraper.sendTweet(
              tweet.trim()
            );
            const data = await response.json();

            previousTweetId =
              data?.data?.create_tweet?.tweet_results?.result?.rest_id;
            logger.debug(`Previous tweet id: ${previousTweetId}`);
          } else {
            const response = await this.baseClient.twitterScraper.sendTweet(
              tweet.trim(),
              previousTweetId
            );
            const data = await response.json();
            previousTweetId =
              data?.data?.create_tweet?.tweet_results?.result?.rest_id;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } else {
        await this.baseClient.twitterScraper.sendTweet(content);
      }
      const minTime = this.baseClient.twitterConfig.POST_INTERVAL_MIN;
      const maxTime = this.baseClient.twitterConfig.POST_INTERVAL_MAX;
      const nextPostTime = Math.floor(
        Math.random() * (maxTime - minTime) + minTime
      );

      logger.info(
        `Next post in ${nextPostTime} seconds for agentId: ${agentId}`
      );
      setTimeout(postTweet, nextPostTime * 1000);
    };

    await postTweet();
  }
}
