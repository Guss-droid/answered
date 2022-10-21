/*
  Warnings:

  - You are about to drop the column `customerId` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `SavedQuestions` table. All the data in the column will be lost.
  - Added the required column `customerEmail` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `SavedQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SavedQuestions" DROP CONSTRAINT "SavedQuestions_customerId_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "customerId",
ADD COLUMN     "customerEmail" TEXT;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "customerId",
ADD COLUMN     "customerEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SavedQuestions" DROP COLUMN "customerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_customerEmail_fkey" FOREIGN KEY ("customerEmail") REFERENCES "Customer"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_customerEmail_fkey" FOREIGN KEY ("customerEmail") REFERENCES "Customer"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedQuestions" ADD CONSTRAINT "SavedQuestions_customerEmail_fkey" FOREIGN KEY ("customerEmail") REFERENCES "Customer"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
