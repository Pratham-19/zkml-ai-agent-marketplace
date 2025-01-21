-- CreateEnum
CREATE TYPE "SocialType" AS ENUM ('TWITTER', 'TELEGRAM', 'DISCORD', 'TIKTOK');

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "social" "SocialType" NOT NULL DEFAULT 'TWITTER';
