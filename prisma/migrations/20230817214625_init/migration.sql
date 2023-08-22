/*
  Warnings:

  - You are about to drop the column `notability` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `otherName` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `subOrDub` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `anilistId` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `malId` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mappings` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_userId_fkey";

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "notability",
DROP COLUMN "otherName",
DROP COLUMN "subOrDub",
DROP COLUMN "url",
ADD COLUMN     "anilistId" INTEGER NOT NULL,
ADD COLUMN     "cover" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "malId" INTEGER NOT NULL,
ADD COLUMN     "mappings" JSONB NOT NULL,
ADD COLUMN     "popularity" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "season" TEXT NOT NULL,
ADD COLUMN     "synonyms" TEXT[],
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Bookmark" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CommentLike" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_id_token_key" ON "Token"("id", "token");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
