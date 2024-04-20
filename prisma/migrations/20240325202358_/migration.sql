-- CreateTable
CREATE TABLE "UserToken" (
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenTypeId" INTEGER NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("userId","tokenTypeId","validFrom")
);

-- CreateTable
CREATE TABLE "UserTokenType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserTokenType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_tokenTypeId_fkey" FOREIGN KEY ("tokenTypeId") REFERENCES "UserTokenType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
