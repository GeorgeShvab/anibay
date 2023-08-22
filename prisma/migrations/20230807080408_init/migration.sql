/*
  Warnings:

  - You are about to drop the column `episodes` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "episodes";

-- CreateTable
CREATE TABLE "AnimeEpisode" (
    "animeId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,

    CONSTRAINT "AnimeEpisode_pkey" PRIMARY KEY ("animeId","episodeId")
);

-- AddForeignKey
ALTER TABLE "AnimeEpisode" ADD CONSTRAINT "AnimeEpisode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeEpisode" ADD CONSTRAINT "AnimeEpisode_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
