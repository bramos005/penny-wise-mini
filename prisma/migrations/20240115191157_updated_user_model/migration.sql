/*
  Warnings:

  - You are about to drop the column `userId` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_userId_fkey";

-- DropIndex
DROP INDEX "User_externalId_key";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "externalId",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
