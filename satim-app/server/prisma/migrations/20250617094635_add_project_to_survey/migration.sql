/*
  Warnings:

  - Added the required column `projectId` to the `survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "survey" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "survey" ADD CONSTRAINT "survey_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
