/*
  Warnings:

  - You are about to drop the column `buyLink` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `fundingEnd` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `hardCap` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `softCap` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `targetAmount` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `targetValidFrom` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `watchLink` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `validTo` on the `FeaturedCoin` table. All the data in the column will be lost.
  - The primary key for the `Fees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `amount` on the `Fees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to drop the column `message` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `Investment` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - The primary key for the `InvestmentCurrentState` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastVerifiedEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CoinCollectionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FundingTarget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBlocked` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTokenType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `investmentTypeId` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_targetAmount_targetValidFrom_fkey";

-- DropForeignKey
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoinCollectionItem" DROP CONSTRAINT "CoinCollectionItem_coinId_fkey";

-- DropForeignKey
ALTER TABLE "CoinCollectionItem" DROP CONSTRAINT "CoinCollectionItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserToken" DROP CONSTRAINT "UserToken_tokenTypeId_fkey";

-- DropForeignKey
ALTER TABLE "UserToken" DROP CONSTRAINT "UserToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropIndex
DROP INDEX "Coin_symbolName_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "BalanceTransaction" ALTER COLUMN "transacted_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "buyLink",
DROP COLUMN "fundingEnd",
DROP COLUMN "hardCap",
DROP COLUMN "softCap",
DROP COLUMN "targetAmount",
DROP COLUMN "targetValidFrom",
DROP COLUMN "watchLink",
ADD COLUMN     "chartLink" TEXT,
ADD COLUMN     "closesAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "holdDuration" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "opensAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalRaise" INTEGER NOT NULL DEFAULT 100000000,
ADD COLUMN     "tradeLink" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'fair-launch',
ADD COLUMN     "unsoldTokens" TEXT DEFAULT 'burn',
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "decimals" SET DEFAULT 9;

-- AlterTable
ALTER TABLE "CoinCurrentState" ALTER COLUMN "validFrom" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FeaturedCoin" DROP COLUMN "validTo";

-- AlterTable
ALTER TABLE "Fees" DROP CONSTRAINT "Fees_pkey",
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ALTER COLUMN "validFrom" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Fees_pkey" PRIMARY KEY ("amount", "validFrom", "feeTypeId");

-- AlterTable
ALTER TABLE "Investment" DROP COLUMN "message",
DROP COLUMN "walletAddress",
ADD COLUMN     "investmentTypeId" INTEGER NOT NULL,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "placedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "InvestmentCurrentState" DROP CONSTRAINT "InvestmentCurrentState_pkey",
ALTER COLUMN "validFrom" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "InvestmentCurrentState_pkey" PRIMARY KEY ("coinId", "userId", "placedAt", "validFrom", "investmentStateId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "lastVerifiedEmail",
DROP COLUMN "name",
DROP COLUMN "profilePicture",
ADD COLUMN     "walletAddress" TEXT;

-- DropTable
DROP TABLE "CoinCollectionItem";

-- DropTable
DROP TABLE "FundingTarget";

-- DropTable
DROP TABLE "UserBlocked";

-- DropTable
DROP TABLE "UserToken";

-- DropTable
DROP TABLE "UserTokenType";

-- DropTable
DROP TABLE "Wallet";

-- CreateTable
CREATE TABLE "InvestmentType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "feeId" INTEGER,

    CONSTRAINT "InvestmentType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentType_name_key" ON "InvestmentType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentType" ADD CONSTRAINT "InvestmentType_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "FeeType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_investmentTypeId_fkey" FOREIGN KEY ("investmentTypeId") REFERENCES "InvestmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
