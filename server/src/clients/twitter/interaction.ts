import type { TwitterBaseClient } from "./base";

export class TwitterInteractionClient {
  baseClient: TwitterBaseClient;

  constructor(baseClient: TwitterBaseClient) {
    this.baseClient = baseClient;
  }

  //Priority
  //TODO: get menitons sorted and reply to them
  //TODO: CHECK FOR COMMENTS ON TWEET AND REPLY TO THEM
  //TODO: GET TIMELINE / OUR, USER
  //TODO: POST: TWEET, RETWEET, LIKE, QUOTE TWEET

  //TODO: FETCH USER POSTS
  //TODO: FETCH USER FOLLOWERS

  // async getTweetReplies() {
  //   //TODO: fetch the tweet and keep the if like   tweet:username:tweet_id   -> set(reply_id)    (max_depth -> 10/50)  {before replying add that tweet to the reply one} -> generate a reply usiing memory
  //   this.baseClient.twitterScraper.getTweetsAndReplies();
  // }
}
