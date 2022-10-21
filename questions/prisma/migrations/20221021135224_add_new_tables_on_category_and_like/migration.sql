-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "likesId" TEXT;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "likesId" TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "categoriesId" TEXT,
ADD COLUMN     "likesId" TEXT;

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_key" ON "Categories"("category");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_likesId_fkey" FOREIGN KEY ("likesId") REFERENCES "Likes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_likesId_fkey" FOREIGN KEY ("likesId") REFERENCES "Likes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_likesId_fkey" FOREIGN KEY ("likesId") REFERENCES "Likes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
