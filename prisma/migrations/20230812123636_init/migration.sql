/*
  Warnings:

  - The `id` column on the `VerificationToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "email" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_id_token_key" ON "VerificationToken"("id", "token");
