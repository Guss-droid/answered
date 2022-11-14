-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "countLike" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "LikesCustomer" (
    "id" TEXT NOT NULL,
    "customerEmail" TEXT,
    "answersId" TEXT,
    "questionId" TEXT,

    CONSTRAINT "LikesCustomer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikesCustomer" ADD CONSTRAINT "LikesCustomer_customerEmail_fkey" FOREIGN KEY ("customerEmail") REFERENCES "Customer"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesCustomer" ADD CONSTRAINT "LikesCustomer_answersId_fkey" FOREIGN KEY ("answersId") REFERENCES "Answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesCustomer" ADD CONSTRAINT "LikesCustomer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
