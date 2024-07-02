/*
  Warnings:

  - You are about to drop the column `nom` on the `Clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Clients` DROP COLUMN `nom`,
    ADD COLUMN `nom_entreprise` VARCHAR(220) NULL;
