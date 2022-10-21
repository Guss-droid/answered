-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "concluedAt" TIMESTAMP(3),
ADD COLUMN     "isConcluded" BOOLEAN NOT NULL DEFAULT false;
