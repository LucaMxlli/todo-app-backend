/*
  Warnings:

  - Made the column `coinId` on table `PlatformLink` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PlatformLink" DROP CONSTRAINT "PlatformLink_coinId_fkey";

-- AlterTable
ALTER TABLE "PlatformLink" ALTER COLUMN "coinId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PlatformLink" ADD CONSTRAINT "PlatformLink_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
