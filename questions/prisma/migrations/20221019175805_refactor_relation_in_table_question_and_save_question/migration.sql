/*
  Warnings:

  - You are about to drop the column `savedQuestionsId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_savedQuestionsId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "savedQuestionsId";

-- AlterTable
ALTER TABLE "SavedQuestions" ADD COLUMN     "questionId" TEXT;

-- AddForeignKey
ALTER TABLE "SavedQuestions" ADD CONSTRAINT "SavedQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
