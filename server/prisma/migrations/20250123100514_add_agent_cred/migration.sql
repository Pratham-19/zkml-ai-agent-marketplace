/*
  Warnings:

  - You are about to drop the column `Credentials` on the `Agent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agent" DROP COLUMN "Credentials",
ADD COLUMN     "credentials" TEXT;
