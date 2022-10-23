/*
  Warnings:

  - You are about to alter the column `fromDate` on the `challenge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `toDate` on the `challenge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `challenge` MODIFY `fromDate` DATETIME(3) NOT NULL,
    MODIFY `toDate` DATETIME(3) NOT NULL,
    MODIFY `img` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `user` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hashTag` (
    `title` VARCHAR(15) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `hashTag_title_key`(`title`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_challengToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_challengToUser_AB_unique`(`A`, `B`),
    INDEX `_challengToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_challengToUser` ADD CONSTRAINT `_challengToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `challenge`(`challengeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_challengToUser` ADD CONSTRAINT `_challengToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
