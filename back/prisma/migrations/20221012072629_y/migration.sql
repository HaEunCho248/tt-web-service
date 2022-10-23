/*
  Warnings:

  - You are about to drop the column `remainingDate` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `challenge` table. All the data in the column will be lost.
  - Added the required column `endRemainingDate` to the `challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startRemainingDate` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `challenge` DROP COLUMN `remainingDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `endRemainingDate` INTEGER NOT NULL,
    ADD COLUMN `startRemainingDate` INTEGER NOT NULL;
