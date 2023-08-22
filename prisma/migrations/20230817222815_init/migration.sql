/*
  Warnings:

  - Added the required column `title` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Made the column `animeId` on table `Episode` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_animeId_fkey";

-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "animeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
