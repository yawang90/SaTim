-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_responseId_fkey";

-- DropForeignKey
ALTER TABLE "response" DROP CONSTRAINT "response_surveyId_fkey";

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "response"("id") ON DELETE CASCADE ON UPDATE CASCADE;
