/*
  Warnings:

  - You are about to drop the column `developers` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `publishers` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "developers",
DROP COLUMN "publishers",
ALTER COLUMN "website" DROP NOT NULL;

-- CreateTable
CREATE TABLE "developers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "developers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_developers" (
    "id" UUID NOT NULL,
    "game_id" UUID NOT NULL,
    "developer_id" UUID NOT NULL,

    CONSTRAINT "game_developers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_publishers" (
    "id" UUID NOT NULL,
    "game_id" UUID,
    "publisher_id" UUID,

    CONSTRAINT "game_publishers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "game_developers" ADD CONSTRAINT "game_developers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_developers" ADD CONSTRAINT "game_developers_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "developers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_publishers" ADD CONSTRAINT "game_publishers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_publishers" ADD CONSTRAINT "game_publishers_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
