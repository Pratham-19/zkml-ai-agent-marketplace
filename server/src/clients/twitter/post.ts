import { logger } from "../../utils/logger";
import type { TwitterBaseClient } from "./base";

export class TwitterPostClient {
  baseClient: TwitterBaseClient;
  private isPosting: boolean = false;
  private timeoutHandle: Timer | null = null;

  constructor(baseClient: TwitterBaseClient) {
    this.baseClient = baseClient;
  }

  async startPosting() {
    logger.info("Starting Twitter client");
    this.isPosting = true;

    let i = 0;
    const postTweet = async () => {
      if (!this.isPosting || i >= 100) {
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
