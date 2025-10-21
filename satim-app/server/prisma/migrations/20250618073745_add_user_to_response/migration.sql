-- AlterTable
ALTER TABLE "response" ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE INDEX "response_userId_idx" ON "response"("userId");

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
