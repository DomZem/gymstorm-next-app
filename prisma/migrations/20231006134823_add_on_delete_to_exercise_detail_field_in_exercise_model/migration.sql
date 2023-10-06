-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_exerciseDetailId_fkey";

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_exerciseDetailId_fkey" FOREIGN KEY ("exerciseDetailId") REFERENCES "ExerciseDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
