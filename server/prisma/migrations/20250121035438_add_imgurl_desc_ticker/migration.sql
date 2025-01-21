/*
  Warnings:

  - Made the column `description` on table `Agent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_url` on table `Agent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ticker` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "image_url" SET NOT NULL,
ALTER COLUMN "ticker" SET NOT NULL;
