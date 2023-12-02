-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'RECRUITER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
