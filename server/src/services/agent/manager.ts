import { AgentMemoryService } from "./memory";
import { AgentPostService } from "./post";
import { AgentBase } from "./base";

export class AgentManager {
  agentMemory: AgentMemoryService;
  postClient: AgentPostService;
  agentBase: AgentBase;

  constructor() {
    this.agentMemory = new AgentMemoryService();
    this.agentBase = new AgentBase();
    this.postClient = new AgentPostService(this.agentBase);
  }
}
