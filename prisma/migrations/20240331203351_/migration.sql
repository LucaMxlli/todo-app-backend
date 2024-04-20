/*
  Warnings:

  - The primary key for the `PlatformLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PlatformLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlatformLink" DROP CONSTRAINT "PlatformLink_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PlatformLink_pkey" PRIMARY KEY ("platformTypeId", "coinId");
