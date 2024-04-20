-- CreateTable
CREATE TABLE "FeaturedCoin" (
    "coinId" INTEGER NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validTo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeaturedCoin_pkey" PRIMARY KEY ("coinId","validFrom")
);

-- AddForeignKey
ALTER TABLE "FeaturedCoin" ADD CONSTRAINT "FeaturedCoin_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
