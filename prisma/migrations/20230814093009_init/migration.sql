/*
  Warnings:

  - You are about to drop the column `animeId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `episodeId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_animeId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "animeId",
ADD COLUMN     "episodeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
