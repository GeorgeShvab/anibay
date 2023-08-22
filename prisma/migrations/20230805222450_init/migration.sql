/*
  Warnings:

  - You are about to drop the column `genres` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "genres";

-- CreateTable
CREATE TABLE "_AnimeToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToGenre_AB_unique" ON "_AnimeToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToGenre_B_index" ON "_AnimeToGenre"("B");

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
