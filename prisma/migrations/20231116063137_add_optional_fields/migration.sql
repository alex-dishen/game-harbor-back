/*
  Warnings:

  - The `updated` column on the `games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "games" ALTER COLUMN "added" SET DEFAULT 0,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "slug" DROP NOT NULL,
DROP COLUMN "updated",
ADD COLUMN     "updated" TIMESTAMP(3);
