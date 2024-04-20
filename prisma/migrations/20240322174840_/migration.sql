/*
  Warnings:

  - Added the required column `typeId` to the `BalanceTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BalanceTransaction" ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "metamaskId" TEXT;

-- CreateTable
CREATE TABLE "BalanceTransactionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BalanceTransactionType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "BalanceTransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
