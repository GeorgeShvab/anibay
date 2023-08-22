-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "episodes" JSONB[],
    "image" TEXT NOT NULL,
    "notability" INTEGER NOT NULL,
    "otherName" TEXT NOT NULL,
    "related" TEXT[],
    "releaseDate" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "subOrDub" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "totalEpisodes" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "updatedAt" DATE NOT NULL,
    "url" TEXT NOT NULL,
    "views" INTEGER NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number" INTEGER NOT NULL,
    "sources" JSONB[],
    "updatedAt" DATE NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updatedAt" DATE NOT NULL,
    "userName" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimeToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_id_key" ON "Anime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_id_key" ON "Episode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToGenre_AB_unique" ON "_AnimeToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToGenre_B_index" ON "_AnimeToGenre"("B");

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
