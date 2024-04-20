/*
  Warnings:

  - You are about to drop the column `coinId` on the `BalanceTransaction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `BalanceTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_coinId_fkey";

-- AlterTable
ALTER TABLE "BalanceTransaction" DROP COLUMN "coinId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
