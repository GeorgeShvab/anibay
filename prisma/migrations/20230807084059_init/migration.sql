-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_animeId_fkey";

-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "animeId" DROP NOT NULL,
ALTER COLUMN "animeId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
