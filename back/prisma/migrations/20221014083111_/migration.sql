/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[joinedChallengeId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[holdChallengeId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_challengtouser` DROP FOREIGN KEY `_challengToUser_B_fkey`;

-- DropIndex
DROP INDEX `user_userId_key` ON `user`;

-- AlterTable
ALTER TABLE `_challengtouser` MODIFY `B` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `description` VARCHAR(100) NULL,
    ADD COLUMN `holdChallengeId` INTEGER NULL,
    ADD COLUMN `img` BLOB NULL,
    ADD COLUMN `joinedChallengeId` INTEGER NULL,
    ADD COLUMN `withdrawal` TINYINT NOT NULL DEFAULT 0,
    MODIFY `userId` VARCHAR(50) NOT NULL,
    MODIFY `name` VARCHAR(10) NOT NULL,
    MODIFY `email` VARCHAR(30) NOT NULL,
    MODIFY `password` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `liked` (
    `likedId` VARCHAR(45) NOT NULL,
    `userId` VARCHAR(45) NOT NULL,
    `challengeId` INTEGER NOT NULL,

    UNIQUE INDEX `likedId_UNIQUE`(`likedId`),
    UNIQUE INDEX `challengeId_UNIQUE`(`challengeId`),
    PRIMARY KEY (`likedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `point` (
    `userId` VARCHAR(50) NOT NULL,
    `point` INTEGER NULL,

    UNIQUE INDEX `userId_UNIQUE`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refreshToken` (
    `refreshToken` VARCHAR(500) NOT NULL,
    `userId` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `joinedChallengeId_UNIQUE` ON `user`(`joinedChallengeId`);

-- CreateIndex
CREATE UNIQUE INDEX `holdChallengeId_UNIQUE` ON `user`(`holdChallengeId`);

-- CreateIndex
CREATE UNIQUE INDEX `email_UNIQUE` ON `user`(`email`);

-- AddForeignKey
ALTER TABLE `_challengToUser` ADD CONSTRAINT `_challengToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
