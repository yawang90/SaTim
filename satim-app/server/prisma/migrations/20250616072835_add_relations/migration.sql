-- CreateEnum
CREATE TYPE "Choice" AS ENUM ('yes', 'no');

-- CreateTable
CREATE TABLE "response" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "choice" TEXT NOT NULL,
    "competencesFrom" TEXT[],
    "competencesTo" TEXT[],

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "response_sessionId_key" ON "response"("sessionId");

-- CreateIndex
CREATE INDEX "answer_responseId_idx" ON "answer"("responseId");

-- CreateIndex
CREATE INDEX "answer_questionId_idx" ON "answer"("questionId");

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
