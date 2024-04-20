/*
  Warnings:

  - The primary key for the `CoinCollectionItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addedAt` on the `CoinCollectionItem` table. All the data in the column will be lost.
  - You are about to drop the column `addedUntil` on the `CoinCollectionItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoinCollectionItem" DROP CONSTRAINT "CoinCollectionItem_pkey",
DROP COLUMN "addedAt",
DROP COLUMN "addedUntil",
ADD CONSTRAINT "CoinCollectionItem_pkey" PRIMARY KEY ("coinId", "userId");
