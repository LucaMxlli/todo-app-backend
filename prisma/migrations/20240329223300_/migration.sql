/*
  Warnings:

  - You are about to drop the column `subtitle` on the `Coin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "subtitle",
ADD COLUMN     "buyLink" TEXT,
ADD COLUMN     "watchLink" TEXT;
