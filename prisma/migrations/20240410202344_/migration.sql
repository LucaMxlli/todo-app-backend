/*
  Warnings:

  - You are about to drop the column `amountInvest` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `amountPool` on the `Investment` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Investment" DROP COLUMN "amountInvest",
DROP COLUMN "amountPool",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL;
