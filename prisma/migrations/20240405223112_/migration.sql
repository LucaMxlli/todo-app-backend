-- CreateTable
CREATE TABLE "UserBlocked" (
    "userId" INTEGER NOT NULL,
    "gueltigAb" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gueltigBis" TIMESTAMP(3),

    CONSTRAINT "UserBlocked_pkey" PRIMARY KEY ("userId","gueltigAb")
);
