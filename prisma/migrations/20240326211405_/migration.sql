/*
  Warnings:

  - A unique constraint covering the columns `[signature]` on the table `Investment` will be added. If there are existing duplicate values, this will fail.
  - Made the column `signature` on table `Investment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Investment" ALTER COLUMN "signature" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastVerifiedEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Investment_signature_key" ON "Investment"("signature");
