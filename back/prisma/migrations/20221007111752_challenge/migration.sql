/*
  Warnings:

  - You are about to alter the column `title` on the `challenge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `description` on the `challenge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `createdAt` on the `challenge` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pointId]` on the table `challenge` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `commenter`;

-- AlterTable
ALTER TABLE `challenge` MODIFY `title` VARCHAR(20) NOT NULL,
    MODIFY `description` VARCHAR(100) NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- DropTable
DROP TABLE `comments`;

-- DropTable
DROP TABLE `users`;

-- CreateIndex
CREATE UNIQUE INDEX `challenge_pointId_key` ON `challenge`(`pointId`);

-- RenameIndex
ALTER TABLE `challenge` RENAME INDEX `Challenge_challengeId_key` TO `challenge_challengeId_key`;

-- RenameIndex
ALTER TABLE `challenge` RENAME INDEX `Challenge_userId_key` TO `challenge_userId_key`;
