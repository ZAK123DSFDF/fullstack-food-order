/*
  Warnings:

  - Added the required column `restaurantId` to the `servantRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servantRole" ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "servantRole" ADD CONSTRAINT "servantRole_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
