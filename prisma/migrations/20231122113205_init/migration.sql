-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "poster" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Details" (
    "id" SERIAL NOT NULL,
    "releaseDate" DATE NOT NULL,
    "awards" INTEGER NOT NULL,
    "runtime" TIME NOT NULL,
    "mediaId" INTEGER NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favourite" (
    "userId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("userId","mediaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Details_mediaId_key" ON "Details"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_userId_key" ON "Favourite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_mediaId_key" ON "Favourite"("mediaId");

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
