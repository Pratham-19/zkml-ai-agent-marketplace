import type { Tweet } from "agent-twitter-client";
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
        await this.generateThread(content, "<thread>");
      } else {
        await this.baseClient.twitterScraper.sendTweet(
          this.parseTweet(content)
        );
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

  async startMentionWatch() {
    logger.info("Starting mention watch");

    const watchMentions = async () => {
      if (!this.agentId) {
        logger.error("No agent found");
        return;
      }

      const isLoggedIn = await this.baseClient.twitterScraper.isLoggedIn();
      if (!isLoggedIn) {
        logger.error("Not logged in");
        const isAuthenticated = await this.baseClient.init();
        if (!isAuthenticated) {
          logger.error("Failed to authenticate");
          return;
        }
      }

      logger.debug(`Checking if agent is active for agentId: ${this.agentId}`);
      const isActive = await this.agentManager.agentBase.isActive(this.agentId);

      if (!isActive) {
        logger.error("Agent is not active");
        return;
      }

      const username = this.baseClient.twitterConfig.TWITTER_USERNAME;
      const timeAgo =
        this.baseClient.twitterConfig.TWITTER_POLL_INTERVAL * 1000;
      const now = new Date();
      const bufferTime = new Date(now.getTime() - timeAgo);

      const query = `(@${username}) since:${bufferTime.toISOString()}`;

      logger.info(`(@${username}) since:${bufferTime.toISOString()}`);

      const tweetGenerator = this.baseClient.twitterScraper.searchTweets(
        query,
        200
      );

      for await (const tweet of tweetGenerator) {
        if (tweet.username === username) {
          continue;
        }

        const tweetTime = tweet.timeParsed?.getTime() || 0;
        const cutoffTime = new Date().getTime() - timeAgo;

        if (tweetTime < cutoffTime) continue;

        const context = await this.buildTweetContext(tweet);
        if (context) {
          const response = await this.agentManager.postClient.generateReply(
            this.agentId,
            context,
            username
          );

          if (response) {
            await this.baseClient.twitterScraper.sendTweet(
              this.parseTweet(response),
              tweet.id
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          logger.info(`Found mention from @${context?.mainTweet?.username}`);
        }
      }

      setTimeout(watchMentions, timeAgo);
    };

    await watchMentions();
  }

  async buildTweetContext(tweet: Tweet) {
    if (!tweet.id) return null;

    const context: {
      mainTweet: Tweet;
      parentTweet: Tweet | null;
      conversationTweets: Tweet[];
      quotedTweet: Tweet | null;
    } = {
      mainTweet: tweet,
      parentTweet: null,
      conversationTweets: [],
      quotedTweet: null,
    };

    // Get parent tweet if reply
    if (tweet.inReplyToStatusId) {
      const parent = await this.baseClient.twitterScraper.getTweet(
        tweet.inReplyToStatusId
      );
      if (parent) {
        context.parentTweet = parent;
      }
    }

    // Get quoted tweet
    if (tweet.quotedStatusId) {
      const quoted = await this.baseClient.twitterScraper.getTweet(
        tweet.quotedStatusId
      );
      if (quoted) {
        context.quotedTweet = quoted;
      }
    }

    // Get conversation tweets
    if (tweet.conversationId && tweet.conversationId !== tweet.id) {
      const searchGen = this.baseClient.twitterScraper.searchTweets(
        `(conversation_id:${tweet.conversationId})`,
        10
      );

      for await (const convTweet of searchGen) {
        if (convTweet.id !== tweet.id) {
          context.conversationTweets.push(convTweet);
        }
      }

      // Sort by time
      context.conversationTweets.sort(
        (a, b) =>
          (a.timeParsed?.getTime() || 0) - (b.timeParsed?.getTime() || 0)
      );
    }

    return context;
  }

  async generateThread(content: string, splitStr: string) {
    const tweets = content.split(splitStr);
    let previousTweetId: string | null = null;

    for (const tweet of tweets) {
      if (!previousTweetId) {
        const response = await this.baseClient.twitterScraper.sendTweet(
          this.parseTweet(tweet)
        );
        const data = await response.json();

        previousTweetId =
          data?.data?.create_tweet?.tweet_results?.result?.rest_id;
      } else {
        const response = await this.baseClient.twitterScraper.sendTweet(
          this.parseTweet(tweet),
          previousTweetId
        );
        const data = await response.json();
        previousTweetId =
          data?.data?.create_tweet?.tweet_results?.result?.rest_id;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  parseTweet(content: string) {
    return content.trim().substring(0, 280);
  }
}
