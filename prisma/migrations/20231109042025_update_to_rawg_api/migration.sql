/*
  Warnings:

  - Added the required column `added` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "developers" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "added" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updated" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "publishers" ADD COLUMN     "slug" TEXT;

-- CreateTable
CREATE TABLE "screenshots" (
    "id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "game_id" UUID NOT NULL,

    CONSTRAINT "screenshots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "screenshots" ADD CONSTRAINT "screenshots_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
