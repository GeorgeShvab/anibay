-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_id_fkey";

-- CreateTable
CREATE TABLE "_relations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_relations_AB_unique" ON "_relations"("A", "B");

-- CreateIndex
CREATE INDEX "_relations_B_index" ON "_relations"("B");

-- AddForeignKey
ALTER TABLE "_relations" ADD CONSTRAINT "_relations_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_relations" ADD CONSTRAINT "_relations_B_fkey" FOREIGN KEY ("B") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
