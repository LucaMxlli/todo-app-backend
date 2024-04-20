/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbolName]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coin_name_key" ON "Coin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_symbolName_key" ON "Coin"("symbolName");
