-- DropForeignKey
ALTER TABLE "PlatformLink" DROP CONSTRAINT "PlatformLink_coinId_fkey";

-- AlterTable
ALTER TABLE "PlatformLink" ALTER COLUMN "coinId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PlatformLink" ADD CONSTRAINT "PlatformLink_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
