/*
  Warnings:

  - Added the required column `dateGap` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `challenge` ADD COLUMN `dateGap` INTEGER NOT NULL,
    MODIFY `fromDate` VARCHAR(191) NOT NULL,
    MODIFY `toDate` VARCHAR(191) NOT NULL;
