-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER', 'SERVANT');

-- CreateEnum
CREATE TYPE "allowedActions" AS ENUM ('SEE_ORDERS', 'UPDATE_ORDERS', 'SEE_CUSTOMER_INFO', 'ADD_MENU', 'ADD_ROLE', 'UPDATE_ROLE', 'DELETE_ROLE', 'ADD_USER', 'UPDATE_USER', 'DELETE_USER');

-- CreateEnum
CREATE TYPE "menuStatus" AS ENUM ('CREATED', 'PREPARING', 'READY', 'DELIVERED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "servantRoleId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "adminId" INTEGER,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servantRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "allowedActions" "allowedActions"[],
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "servantRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "menuStatus" "menuStatus" NOT NULL DEFAULT 'CREATED',
    "toppings" TEXT[],

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_adminId_key" ON "Restaurant"("adminId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_servantRoleId_fkey" FOREIGN KEY ("servantRoleId") REFERENCES "servantRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
