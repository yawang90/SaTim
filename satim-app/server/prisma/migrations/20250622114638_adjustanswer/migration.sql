/*
  Warnings:

  - The values [yes,no] on the enum `choice` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `userId` on table `response` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "choice_new" AS ENUM ('Ja', 'Nein');
ALTER TABLE "question" ALTER COLUMN "answer" TYPE "choice_new" USING ("answer"::text::"choice_new");
ALTER TYPE "choice" RENAME TO "choice_old";
ALTER TYPE "choice_new" RENAME TO "choice";
DROP TYPE "choice_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "response" DROP CONSTRAINT "response_userId_fkey";

-- AlterTable
ALTER TABLE "response" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
