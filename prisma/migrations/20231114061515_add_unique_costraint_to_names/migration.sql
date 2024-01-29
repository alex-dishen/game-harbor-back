/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `developers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `genres` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `platforms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `publishers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "developers_name_key" ON "developers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_name_key" ON "platforms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "publishers_name_key" ON "publishers"("name");
