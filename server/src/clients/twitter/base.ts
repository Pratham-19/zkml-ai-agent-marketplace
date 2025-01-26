import type { Scraper } from "agent-twitter-client";
import { twitterEnvSchema, type TwitterConfig } from "./enviroment";
import { TwitterScraper } from "./scraper";
import { logger } from "../../utils/logger";
import type { ITwitterProfile } from "../../types/twitter";
import { redis } from "../../config/redis";

export class TwitterBaseClient {
  twitterConfig: TwitterConfig;
  twitterScraper: Scraper;
  profile: ITwitterProfile | null | undefined;

  constructor(twitterConfig: TwitterConfig) {
    const { success, data, error } = twitterEnvSchema.safeParse(twitterConfig);

    if (!success) {
      logger.error("Invalid Twitter Config", error);
      throw Error("Invalid Twitter Config");
    }
    this.twitterConfig = data;
    const scraper = new TwitterScraper();
    this.twitterScraper = scraper.getScraper();
  }

  /**
   * Login and get user profile
   */
  async init(): Promise<boolean> {
    let retries = this.twitterConfig.TWITTER_RETRY_LIMIT;
    const username = this.twitterConfig.TWITTER_USERNAME;
    const password = this.twitterConfig.TWITTER_PASSWORD;
    const email = this.twitterConfig.TWITTER_EMAIL;
    const twitter2faSecret = this.twitterConfig.TWITTER_2FA_SECRET;

    logger.info("Fetching cached cookies");
    const cachedCookies = await this.getCachedCookies(username);

    if (cachedCookies) {
      logger.info("Using cached cookies");
      await this.twitterScraper.setCookies(cachedCookies);
    }

    logger.info("Logging into X/Twitter");
    while (retries > 0) {
      try {
        if (await this.twitterScraper.isLoggedIn()) {
          logger.info("Logged into X/Twitter");
          break;
        } else {
          logger.info("Attempting to login to X/Twitter");
          await this.twitterScraper.login(
            username,
            password,
            email,
            twitter2faSecret
          );

          if (await this.twitterScraper.isLoggedIn()) {
            logger.info("Logged into X/Twitter");
            logger.info("Caching cookies for future login attempts");

            const cookies = await this.twitterScraper.getCookies();

            await this.cacheCookie(username, cookies);

            break;
          } else {
            retries--;
            logger.warn(`Login attempt failed, ${retries} attempt(s) left`);
          }
        }
      } catch (error) {
        logger.error(`Error while logging into X/Twitter: ${error}`);
      }

      if (retries === 0) {
        logger.error("Max retries reached. Exiting login process.");
        throw new Error("Twitter login failed after maximum retries.");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    this.profile = await this.fetchProfile(username);

    if (this.profile) {
      logger.info(`Twitter user ID: ${this.profile.id}`);
      logger.info(`Twitter username: ${this.profile.username}`);
      return true;
    } else {
      throw new Error("Failed to load profile");
    }
    return false;
  }

  async getCachedCookies(username: string): Promise<string[] | null> {
    logger.debug(`Fetching cached cookies for: ${username}`);
    const cachedCookies: string[] | null = await redis.get(
      `twitter:${username}:cookies`
    );
    return cachedCookies;
  }

  parseCookie(cookiesArray: any[]) {
    return cookiesArray.map(
      (cookie) =>
        `${cookie.key}=${cookie.value}; Domain=${cookie.domain}; Path=${
          cookie.path
        }; ${cookie.secure ? "Secure" : ""}; ${
          cookie.httpOnly ? "HttpOnly" : ""
        }; SameSite=${cookie.sameSite || "Lax"}`
    );
  }

  async cacheCookie(username: string, cookie: any[]) {
    logger.debug(`Caching cookies for ${username}`);

    const cookieString = this.parseCookie(cookie);
    await redis.set(`twitter:${username}:cookies`, cookieString, {
      ex: 60 * 60 * 24,
    });
  }

  async fetchProfile(username: string): Promise<ITwitterProfile> {
    try {
      const profile = await this.twitterScraper.getProfile(username);
      return {
        id: profile.userId ?? "",
        username,
        screenName: profile.name || "",
        bio: profile.biography || "",
        nicknames: [],
      };
    } catch (error) {
      logger.error("Error fetching Twitter profile:", error);
      throw error;
    }
  }
}
