-- DropForeignKey
ALTER TABLE "JobVacancy" DROP CONSTRAINT "JobVacancy_companyId_fkey";

-- AlterTable
ALTER TABLE "JobVacancy" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "JobVacancy" ADD CONSTRAINT "JobVacancy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
