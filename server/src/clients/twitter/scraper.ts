import { HttpsProxyAgent } from "https-proxy-agent";
import { env } from "../../config/enviroment";
import { Scraper } from "agent-twitter-client";
import { logger } from "../../utils/logger";

export class TwitterScraper {
  private agent;
  private scraper: Scraper;

  constructor() {
    try {
      this.agent = new HttpsProxyAgent(env.ANON_HTTPS_PROXY);

      this.scraper = new Scraper({
        transform: {
          request: (input, init) => {
            return [
              input,
              {
                ...init,
                agent: this.agent,
              },
            ];
          },
        },
      });

      logger.info("TwitterScraper initialized with proxy");
    } catch (error) {
      logger.error("Error initializing TwitterScraper:", error);
      throw error;
    }
  }

  getScraper(): Scraper {
    return this.scraper;
  }
}
