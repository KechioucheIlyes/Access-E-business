/*
  Warnings:

  - Made the column `statut_paiement` on table `Commission_filleul` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Commission_filleul` MODIFY `statut_paiement` BOOLEAN NOT NULL DEFAULT false;
