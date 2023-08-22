/*
  Warnings:

  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `VerificationToken` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailVerified` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "VerificationToken_identifier_token_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verified",
ADD COLUMN     "emailVerified" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "identifier",
ADD COLUMN     "id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_id_token_key" ON "VerificationToken"("id", "token");
