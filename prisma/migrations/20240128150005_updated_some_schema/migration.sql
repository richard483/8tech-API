/*
  Warnings:

  - You are about to drop the column `previousWorkplaceCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `previousWorkplaceId` on the `User` table. All the data in the column will be lost.
  - Made the column `companyId` on table `JobVacancy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "JobVacancy" ALTER COLUMN "companyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "previousWorkplaceCount",
DROP COLUMN "previousWorkplaceId";
