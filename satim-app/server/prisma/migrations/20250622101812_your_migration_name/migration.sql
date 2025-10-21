/*
  Warnings:

  - You are about to drop the column `questionId` on the `answer` table. All the data in the column will be lost.
  - Changed the type of `choice` on the `answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "choice" AS ENUM ('yes', 'no');

-- DropIndex
DROP INDEX "answer_questionId_idx";

-- AlterTable
ALTER TABLE "answer" DROP COLUMN "questionId",
DROP COLUMN "choice",
ADD COLUMN     "choice" "choice" NOT NULL;

-- DropEnum
DROP TYPE "Choice";
