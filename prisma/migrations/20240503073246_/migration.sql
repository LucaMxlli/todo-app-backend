/*
  Warnings:

  - You are about to drop the column `isPrivileged` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BalanceTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BalanceTransactionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoinCurrentState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoinState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturedCoin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeeType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Investment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestmentCurrentState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestmentState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestmentType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlatformLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlatformType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tokenomics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenomicsType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_typeId_fkey";

-- DropForeignKey
ALTER TABLE "BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoinCurrentState" DROP CONSTRAINT "CoinCurrentState_coinId_fkey";

-- DropForeignKey
ALTER TABLE "CoinCurrentState" DROP CONSTRAINT "CoinCurrentState_stateId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturedCoin" DROP CONSTRAINT "FeaturedCoin_coinId_fkey";

-- DropForeignKey
ALTER TABLE "Fees" DROP CONSTRAINT "Fees_feeTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_coinId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_investmentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_userId_fkey";

-- DropForeignKey
ALTER TABLE "InvestmentCurrentState" DROP CONSTRAINT "InvestmentCurrentState_coinId_userId_placedAt_fkey";

-- DropForeignKey
ALTER TABLE "InvestmentCurrentState" DROP CONSTRAINT "InvestmentCurrentState_investmentStateId_fkey";

-- DropForeignKey
ALTER TABLE "InvestmentType" DROP CONSTRAINT "InvestmentType_feeId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformLink" DROP CONSTRAINT "PlatformLink_coinId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformLink" DROP CONSTRAINT "PlatformLink_platformTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Tokenomics" DROP CONSTRAINT "Tokenomics_coinId_fkey";

-- DropForeignKey
ALTER TABLE "Tokenomics" DROP CONSTRAINT "Tokenomics_tokenomicsTypeId_fkey";

-- DropIndex
DROP INDEX "User_walletAddress_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPrivileged",
DROP COLUMN "walletAddress",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "BalanceTransaction";

-- DropTable
DROP TABLE "BalanceTransactionType";

-- DropTable
DROP TABLE "Coin";

-- DropTable
DROP TABLE "CoinCurrentState";

-- DropTable
DROP TABLE "CoinState";

-- DropTable
DROP TABLE "FeaturedCoin";

-- DropTable
DROP TABLE "FeeType";

-- DropTable
DROP TABLE "Fees";

-- DropTable
DROP TABLE "Investment";

-- DropTable
DROP TABLE "InvestmentCurrentState";

-- DropTable
DROP TABLE "InvestmentState";

-- DropTable
DROP TABLE "InvestmentType";

-- DropTable
DROP TABLE "PlatformLink";

-- DropTable
DROP TABLE "PlatformType";

-- DropTable
DROP TABLE "Tokenomics";

-- DropTable
DROP TABLE "TokenomicsType";

-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
