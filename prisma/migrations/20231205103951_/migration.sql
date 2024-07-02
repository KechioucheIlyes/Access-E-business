/*
  Warnings:

  - You are about to drop the column `montant_commission` on the `Commissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Commissions` DROP COLUMN `montant_commission`,
    ADD COLUMN `montant_commission_total` DOUBLE NULL;
