/*
  Warnings:

  - You are about to alter the column `statut_paiement` on the `Commissions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Commissions` MODIFY `statut_paiement` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `filleul` ADD COLUMN `montant_commission_filleul` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `montant_commission_parrain` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `statut_paiement` BOOLEAN NULL DEFAULT false;
