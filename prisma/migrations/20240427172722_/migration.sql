-- CreateTable
CREATE TABLE "BalanceTransactionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BalanceTransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BalanceTransactionType_name_key" ON "BalanceTransactionType"("name");

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "BalanceTransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
