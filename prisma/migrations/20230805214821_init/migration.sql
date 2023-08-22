/*
  Warnings:

  - You are about to drop the `_AnimeToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnimeToGenre" DROP CONSTRAINT "_AnimeToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeToGenre" DROP CONSTRAINT "_AnimeToGenre_B_fkey";

-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "genres" TEXT[];

-- DropTable
DROP TABLE "_AnimeToGenre";
