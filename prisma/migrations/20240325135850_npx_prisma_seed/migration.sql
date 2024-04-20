/*
  Warnings:

  - You are about to drop the column `metamaskId` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `payout` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `refunded` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `metamaskAddress` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Investment" DROP COLUMN "metamaskId",
DROP COLUMN "payout",
DROP COLUMN "refunded",
ADD COLUMN     "signature" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "metamaskAddress";

-- CreateTable
CREATE TABLE "Wallet" (
    "address" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("address")
);

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
