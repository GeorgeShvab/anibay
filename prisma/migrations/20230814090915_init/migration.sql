/*
  Warnings:

  - Added the required column `updatedAt` to the `CommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentLike" ADD COLUMN     "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE NOT NULL;
