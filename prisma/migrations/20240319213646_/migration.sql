-- AlterTable
ALTER TABLE "Coin" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
