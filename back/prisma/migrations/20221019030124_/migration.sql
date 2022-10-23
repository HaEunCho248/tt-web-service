/*
  Warnings:

  - You are about to drop the column `img` on the `challenge` table. All the data in the column will be lost.
  - The primary key for the `refreshtoken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `holdChallengeId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `joinedChallengeId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_challengtouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hashtag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `refreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `explainImg` to the `challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holdUserId` to the `challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainImg` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_challengtouser` DROP FOREIGN KEY `_challengToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_challengtouser` DROP FOREIGN KEY `_challengToUser_B_fkey`;

-- DropIndex
DROP INDEX `challengeId_UNIQUE` ON `liked`;

-- DropIndex
DROP INDEX `holdChallengeId_UNIQUE` ON `user`;

-- DropIndex
DROP INDEX `joinedChallengeId_UNIQUE` ON `user`;

-- AlterTable
ALTER TABLE `challenge` DROP COLUMN `img`,
    ADD COLUMN `explainImg` TEXT NOT NULL,
    ADD COLUMN `holdUserId` VARCHAR(50) NOT NULL,
    ADD COLUMN `mainImg` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `refreshtoken` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `description`,
    DROP COLUMN `holdChallengeId`,
    DROP COLUMN `joinedChallengeId`;

-- DropTable
DROP TABLE `_challengtouser`;

-- DropTable
DROP TABLE `hashtag`;

-- CreateTable
CREATE TABLE `userToChallenge` (
    `userToChallengeId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(45) NOT NULL,
    `challengeId` INTEGER NOT NULL,

    UNIQUE INDEX `userToChallenge_userToChallengeId_key`(`userToChallengeId`),
    PRIMARY KEY (`userToChallengeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `joinedChallenge` (
    `joinedId` INTEGER NOT NULL AUTO_INCREMENT,
    `addedImage` TEXT NOT NULL,
    `chalngId` INTEGER NOT NULL,
    `countUpload` INTEGER NOT NULL,

    UNIQUE INDEX `joinedChallenge_joinedId_key`(`joinedId`),
    PRIMARY KEY (`joinedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `userId_UNIQUE` ON `refreshToken`(`userId`);

-- AddForeignKey
ALTER TABLE `liked` ADD CONSTRAINT `liked_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `liked` ADD CONSTRAINT `liked_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `challenge`(`challengeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userToChallenge` ADD CONSTRAINT `userToChallenge_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userToChallenge` ADD CONSTRAINT `userToChallenge_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `challenge`(`challengeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refreshToken` ADD CONSTRAINT `refreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `joinedChallenge` ADD CONSTRAINT `joinedChallenge_chalngId_fkey` FOREIGN KEY (`chalngId`) REFERENCES `challenge`(`challengeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
