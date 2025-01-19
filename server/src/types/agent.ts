export interface AgentConfig {
  name: string;
  ownerId: string;
  objective: string;
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
}
