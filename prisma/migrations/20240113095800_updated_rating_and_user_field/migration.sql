/*
  Warnings:

  - You are about to drop the column `givenByUserId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `portofolio` on the `User` table. All the data in the column will be lost.
  - Added the required column `recruiterUserId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "givenByUserId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "recruiterUserId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "portofolio",
ADD COLUMN     "portfolio" TEXT[];
