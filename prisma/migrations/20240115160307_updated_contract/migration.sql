-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "ratingId" TEXT,
ADD COLUMN     "workSubmission" TEXT;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
