/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "RoleType" NOT NULL DEFAULT 'USER',
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");
