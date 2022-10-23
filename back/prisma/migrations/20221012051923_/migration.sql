/*
  Warnings:

  - You are about to drop the column `dateGap` on the `challenge` table. All the data in the column will be lost.
  - Added the required column `remainingDate` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `challenge` DROP COLUMN `dateGap`,
    ADD COLUMN `remainingDate` INTEGER NOT NULL;
