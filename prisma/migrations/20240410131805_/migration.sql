/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BalanceTransactionType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CoinState` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `FeeType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `InvestmentState` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `PlatformType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `UserTokenType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BalanceTransactionType_name_key" ON "BalanceTransactionType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoinState_name_key" ON "CoinState"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FeeType_name_key" ON "FeeType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentState_name_key" ON "InvestmentState"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformType_name_key" ON "PlatformType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserTokenType_name_key" ON "UserTokenType"("name");
