/*
  Warnings:

  - Made the column `credentials` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "credentials" SET NOT NULL;
