/*
  Warnings:

  - You are about to drop the column `count` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `menuStatus` on the `menu` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PREPARING', 'READY', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_adminId_fkey";

-- AlterTable
ALTER TABLE "menu" DROP COLUMN "count",
DROP COLUMN "menuStatus";

-- DropEnum
DROP TYPE "menuStatus";

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "orderStatus" "orderStatus" NOT NULL DEFAULT 'PREPARING',
    "count" INTEGER NOT NULL DEFAULT 1,
    "customerId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
