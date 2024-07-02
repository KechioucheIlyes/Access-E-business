/*
  Warnings:

  - You are about to drop the column `statut_paiement` on the `filleul` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Commission_filleul` ADD COLUMN `statut_paiement` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `filleul` DROP COLUMN `statut_paiement`;
