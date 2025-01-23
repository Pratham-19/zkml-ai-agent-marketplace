export interface ITwitterProfile {
  id: string;
  username: string;
  screenName: string;
  bio: string;
  nicknames: string[];
}

export interface ITwitterCredentials {
  email: string;
  username: string;
  password: string;
}
