-- AlterTable
ALTER TABLE "Coin" ADD COLUMN     "hardCap" DECIMAL(65,30) DEFAULT 20,
ADD COLUMN     "maxInvestment" DECIMAL(65,30) NOT NULL DEFAULT 0.1,
ADD COLUMN     "minInvestment" DECIMAL(65,30) NOT NULL DEFAULT 0.01,
ADD COLUMN     "softCap" DECIMAL(65,30) NOT NULL DEFAULT 5,
ADD COLUMN     "totalSupply" DECIMAL(65,30) NOT NULL DEFAULT 1000000000;

-- CreateTable
CREATE TABLE "TokenomicsType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TokenomicsType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokenomics" (
    "tokenomicsTypeId" INTEGER NOT NULL,
    "coinId" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Tokenomics_pkey" PRIMARY KEY ("coinId","tokenomicsTypeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenomicsType_name_key" ON "TokenomicsType"("name");

-- AddForeignKey
ALTER TABLE "Tokenomics" ADD CONSTRAINT "Tokenomics_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokenomics" ADD CONSTRAINT "Tokenomics_tokenomicsTypeId_fkey" FOREIGN KEY ("tokenomicsTypeId") REFERENCES "TokenomicsType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
