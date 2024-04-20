/*
  Warnings:

  - You are about to drop the column `neg` on the `BalanceTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `BalanceTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BalanceTransaction" DROP COLUMN "neg",
DROP COLUMN "pos",
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL DEFAULT 0;
