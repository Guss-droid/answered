/*
  Warnings:

  - You are about to drop the column `likesId` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `likesId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `likesId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_likesId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_likesId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_likesId_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "likesId";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "likesId";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "likesId";

-- DropTable
DROP TABLE "Likes";
