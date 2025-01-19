/*
  Warnings:

  - A unique constraint covering the columns `[agentId,type,content]` on the table `AgentMemory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AgentMemory_agentId_type_content_key" ON "AgentMemory"("agentId", "type", "content");
