/*
  Warnings:

  - Added the required column `startDate` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `challenge` ADD COLUMN `startDate` INTEGER NOT NULL;
