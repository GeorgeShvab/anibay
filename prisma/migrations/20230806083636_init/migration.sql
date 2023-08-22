/*
  Warnings:

  - You are about to drop the column `related` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "related";

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_id_fkey" FOREIGN KEY ("id") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
