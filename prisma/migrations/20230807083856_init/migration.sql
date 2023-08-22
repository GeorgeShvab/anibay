/*
  Warnings:

  - You are about to drop the `AnimeEpisode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimeEpisode" DROP CONSTRAINT "AnimeEpisode_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeEpisode" DROP CONSTRAINT "AnimeEpisode_episodeId_fkey";

-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "animeId" TEXT NOT NULL DEFAULT 'df';

-- DropTable
DROP TABLE "AnimeEpisode";

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
