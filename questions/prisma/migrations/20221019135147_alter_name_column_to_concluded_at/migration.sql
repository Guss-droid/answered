/*
  Warnings:

  - You are about to drop the column `concluedAt` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "concluedAt",
ADD COLUMN     "concludedAt" TIMESTAMP(3);
