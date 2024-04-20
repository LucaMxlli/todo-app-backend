-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPrivileged" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "BalanceTransaction" (
    "id" SERIAL NOT NULL,
    "pos" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "neg" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "transacted_at" TIMESTAMP(3) NOT NULL,
    "coinId" INTEGER NOT NULL,

    CONSTRAINT "BalanceTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
