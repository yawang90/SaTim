/*
  Warnings:

  - You are about to drop the `answer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_responseId_fkey";

-- DropTable
DROP TABLE "answer";

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "answer" "choice" NOT NULL,
    "competencesFrom" TEXT[],
    "competencesTo" TEXT[],

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "question_responseId_idx" ON "question"("responseId");

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
