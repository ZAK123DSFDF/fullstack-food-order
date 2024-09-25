/*
  Warnings:

  - You are about to drop the column `adminId` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_adminId_fkey";

-- DropIndex
DROP INDEX "Restaurant_adminId_key";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
