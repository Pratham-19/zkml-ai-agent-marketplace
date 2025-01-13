import type { Scraper } from "agent-twitter-client";
import { twitterEnvSchema, type TwitterConfig } from "./enviroment";
import { TwitterScraper } from "./scraper";
import { logger } from "../../utils/logger";
import type { ITwitterProfile } from "../../types/twitter";

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

  //TODO: GET TIMELINE / OUR, USER
  //TODO: FETCH OWN POST
  //TODO: CAHCE COOKIE

  /**
   * Login and get user profile
   */
  async init() {
    let retries = this.twitterConfig.TWITTER_RETRY_LIMIT;
    const username = this.twitterConfig.TWITTER_USERNAME;
    const password = this.twitterConfig.TWITTER_PASSWORD;
    const email = this.twitterConfig.TWITTER_EMAIL;
    const twitter2faSecret = this.twitterConfig.TWITTER_2FA_SECRET;

    logger.info("Fetching cached cookies");
    const cachedCookies = await this.getCachedCookies(username);

    if (cachedCookies) {
      logger.info("Using cached cookies");
      await this.setCookiesFromArray(cachedCookies);
    }

    logger.info("Logging into X/Twitter");
    while (retries > 0) {
      try {
        if (await this.twitterScraper.isLoggedIn()) {
          logger.info("Logged into X/Twitter");
          break;
        } else {
          logger.info("No cookie found using credentials for X/Twitter");

          this.twitterScraper.login(
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
            logger.warn(`Login attempt failed, ${retries} attempt left`);
          }
        }
      } catch (error) {
        logger.error("Error while logging into X/Twitter:", error);
      }

      if (retries === 0) {
        logger.error("Max retries reached. Exiting login process.");
        throw new Error("Twitter login failed after maximum retries.");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    this.profile = await this.fetchProfile(username);

    if (this.profile) {
      logger.info("Twitter user ID:", this.profile.id);
    } else {
      throw new Error("Failed to load profile");
    }

    // await this.loadLatestCheckedTweetId();
    // await this.populateTimeline();
  }

  async getCachedCookies(username: string): Promise<string[]> {
    //TODO: ADD REDIS CACHINGN
    return [];
  }

  async setCookiesFromArray(cookiesArray: any[]) {
    const cookieStrings = cookiesArray.map(
      (cookie) =>
        `${cookie.key}=${cookie.value}; Domain=${cookie.domain}; Path=${
          cookie.path
        }; ${cookie.secure ? "Secure" : ""}; ${
          cookie.httpOnly ? "HttpOnly" : ""
        }; SameSite=${cookie.sameSite || "Lax"}`
    );
    await this.twitterScraper.setCookies(cookieStrings);
  }

  async cacheCookie(username: string, cookie: any[]) {
    //TODO: ADD REDIS CACHINGN
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
