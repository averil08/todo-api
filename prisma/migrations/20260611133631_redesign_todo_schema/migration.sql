/*
  Warnings:

  - You are about to drop the column `completed` on the `Todo` table. All the data in the column will be lost.
  - The `status` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('NOT_STARTED', 'PENDING', 'DONE');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "completed",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'PENDING';
