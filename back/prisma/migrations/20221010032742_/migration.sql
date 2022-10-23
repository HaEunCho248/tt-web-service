/*
  Warnings:

  - You are about to alter the column `fromDate` on the `challenge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `toDate` on the `challenge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Added the required column `img` to the `challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `challenge` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `img` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `title` VARCHAR(50) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `fromDate` DATETIME(3) NOT NULL,
    MODIFY `toDate` DATETIME(3) NOT NULL;
