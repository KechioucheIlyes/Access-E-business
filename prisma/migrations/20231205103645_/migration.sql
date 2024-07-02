-- AlterTable
ALTER TABLE `Commissions` ADD COLUMN `montant_commission_CSPE` DOUBLE NULL,
    ADD COLUMN `montant_commission_GBT` DOUBLE NULL,
    ADD COLUMN `montant_commission_TURP` DOUBLE NULL,
    ADD COLUMN `montant_commission_courtage` DOUBLE NULL,
    ADD COLUMN `montant_commission_logiciel` DOUBLE NULL,
    MODIFY `montant_commission` DOUBLE NULL;
