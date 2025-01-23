import { SocialType } from "@prisma/client";

export interface AgentConfig {
  name: string;
  ownerId: string;
  imageURL: string;
  ticker: string;
  description: string;
  objective: string;
  social: SocialType;
  topics: string[];
  style: {
    all: string[];
    chat: string[];
    post: string[];
  };
  adjectives: string[];
  bio: string[];
  lore: string[];
  postExamples: string[];
  isActive?: boolean;
  credentials: string;
}
