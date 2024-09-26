/*
  Warnings:

  - The values [SEE_CUSTOMER_INFO] on the enum `allowedActions` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "allowedActions_new" AS ENUM ('SEE_ORDERS', 'UPDATE_ORDERS', 'ADD_MENU', 'ADD_ROLE', 'UPDATE_ROLE', 'DELETE_ROLE', 'GET_ROLES', 'ADD_USER', 'UPDATE_USER', 'DELETE_USER', 'GET_USERS');
ALTER TABLE "servantRole" ALTER COLUMN "allowedActions" TYPE "allowedActions_new"[] USING ("allowedActions"::text::"allowedActions_new"[]);
ALTER TYPE "allowedActions" RENAME TO "allowedActions_old";
ALTER TYPE "allowedActions_new" RENAME TO "allowedActions";
DROP TYPE "allowedActions_old";
COMMIT;
