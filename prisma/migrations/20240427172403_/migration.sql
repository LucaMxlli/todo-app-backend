/*
  Warnings:

  - You are about to drop the `BalanceTransactionType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_typeId_fkey";

-- AlterTable
ALTER TABLE "Coin" ALTER COLUMN "closesAt" DROP DEFAULT;

-- DropTable
DROP TABLE "BalanceTransactionType";
