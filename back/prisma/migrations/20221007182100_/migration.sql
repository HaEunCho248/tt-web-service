/*
  Warnings:

  - You are about to drop the column `createdAt` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `pointId` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `challenge` table. All the data in the column will be lost.
  - Added the required column `fromDate` to the `challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDate` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `challenge_pointId_key` ON `challenge`;

-- DropIndex
DROP INDEX `challenge_userId_key` ON `challenge`;

-- AlterTable
ALTER TABLE `challenge` DROP COLUMN `createdAt`,
    DROP COLUMN `from`,
    DROP COLUMN `img`,
    DROP COLUMN `pointId`,
    DROP COLUMN `to`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `fromDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `toDate` VARCHAR(191) NOT NULL;
