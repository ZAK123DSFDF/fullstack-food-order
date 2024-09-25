/*
  Warnings:

  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - Added the required column `location` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "location";
