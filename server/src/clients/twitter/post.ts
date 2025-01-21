import { AgentManager } from "../../services/agent/manager";
import { logger } from "../../utils/logger";
import type { TwitterBaseClient } from "./base";

export class TwitterPostClient {
  baseClient: TwitterBaseClient;
  agentManager: AgentManager;
  private isPosting: boolean = false;
  private timeoutHandle: Timer | null = null;

  constructor(baseClient: TwitterBaseClient) {
    this.baseClient = baseClient;
    this.agentManager = new AgentManager();
  }

  async startPosting() {
    logger.info("Starting Twitter client");

    let i = 0;
    const postTweet = async () => {
      logger.info("Checking if agent is active");
      const isActive = await this.agentManager.isActive(
        "8d70f3df-c55f-4e30-9c8e-b7ff01215980"
      );

      if (!isActive) {
        logger.info("Agent is not active");
        return;
      }
      await this.baseClient.twitterScraper.sendTweet("lol" + i + "lol");
      i++;

      this.timeoutHandle = setTimeout(postTweet, 5000);
    };

    await postTweet();
  }

  async stopPosting() {
    logger.info("Stopping Twitter client");
    this.isPosting = false;
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }
}
