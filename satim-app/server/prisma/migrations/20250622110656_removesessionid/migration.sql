/*
  Warnings:

  - You are about to drop the column `sessionId` on the `response` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "response_sessionId_key";

-- AlterTable
ALTER TABLE "response" DROP COLUMN "sessionId";
