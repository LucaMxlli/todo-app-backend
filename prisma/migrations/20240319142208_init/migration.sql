-- CreateTable
CREATE TABLE "FeeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FeeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fees" (
    "amount" DECIMAL(65,30) NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "feeTypeId" INTEGER NOT NULL,

    CONSTRAINT "Fees_pkey" PRIMARY KEY ("amount","validFrom","feeTypeId")
);

-- CreateTable
CREATE TABLE "FundingTarget" (
    "amount" DECIMAL(65,30) NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundingTarget_pkey" PRIMARY KEY ("amount","validFrom")
);

-- CreateTable
CREATE TABLE "PlatformType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PlatformType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformLink" (
    "id" SERIAL NOT NULL,
    "platformTypeId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "coinId" INTEGER NOT NULL,

    CONSTRAINT "PlatformLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinState" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CoinState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinCurrentState" (
    "coinId" INTEGER NOT NULL,
    "stateId" INTEGER NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoinCurrentState_pkey" PRIMARY KEY ("coinId","stateId","validFrom")
);

-- CreateTable
CREATE TABLE "Coin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbolName" TEXT NOT NULL,
    "symbolImage" TEXT NOT NULL,
    "bannerImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "targetAmount" DECIMAL(65,30),
    "targetValidFrom" TIMESTAMP(3),

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentState" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InvestmentState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentCurrentState" (
    "coinId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "placedAt" TIMESTAMP(3) NOT NULL,
    "investmentStateId" INTEGER NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestmentCurrentState_pkey" PRIMARY KEY ("coinId","userId","placedAt","investmentStateId","validFrom")
);

-- CreateTable
CREATE TABLE "Investment" (
    "coinId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "placedAt" TIMESTAMP(3) NOT NULL,
    "amountPool" DECIMAL(65,30) NOT NULL,
    "amountInvest" DECIMAL(65,30) NOT NULL,
    "message" TEXT NOT NULL,
    "refunded" BOOLEAN NOT NULL,
    "payout" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("coinId","userId","placedAt")
);

-- CreateTable
CREATE TABLE "CoinCollectionItem" (
    "coinId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL,
    "addedUntil" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoinCollectionItem_pkey" PRIMARY KEY ("coinId","userId","addedAt")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "metamaskAddress" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Fees" ADD CONSTRAINT "Fees_feeTypeId_fkey" FOREIGN KEY ("feeTypeId") REFERENCES "FeeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformLink" ADD CONSTRAINT "PlatformLink_platformTypeId_fkey" FOREIGN KEY ("platformTypeId") REFERENCES "PlatformType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformLink" ADD CONSTRAINT "PlatformLink_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCurrentState" ADD CONSTRAINT "CoinCurrentState_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCurrentState" ADD CONSTRAINT "CoinCurrentState_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "CoinState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_targetAmount_targetValidFrom_fkey" FOREIGN KEY ("targetAmount", "targetValidFrom") REFERENCES "FundingTarget"("amount", "validFrom") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentCurrentState" ADD CONSTRAINT "InvestmentCurrentState_coinId_userId_placedAt_fkey" FOREIGN KEY ("coinId", "userId", "placedAt") REFERENCES "Investment"("coinId", "userId", "placedAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentCurrentState" ADD CONSTRAINT "InvestmentCurrentState_investmentStateId_fkey" FOREIGN KEY ("investmentStateId") REFERENCES "InvestmentState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCollectionItem" ADD CONSTRAINT "CoinCollectionItem_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCollectionItem" ADD CONSTRAINT "CoinCollectionItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
