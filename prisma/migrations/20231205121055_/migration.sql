-- AlterTable
ALTER TABLE `Commissions` MODIFY `montant_commission_CSPE` DOUBLE NULL DEFAULT 0,
    MODIFY `montant_commission_GBT` DOUBLE NULL DEFAULT 0,
    MODIFY `montant_commission_TURP` DOUBLE NULL DEFAULT 0,
    MODIFY `montant_commission_courtage` DOUBLE NULL DEFAULT 0,
    MODIFY `montant_commission_logiciel` DOUBLE NULL DEFAULT 0,
    MODIFY `montant_commission_total` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Etudes` ADD COLUMN `commissionsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Etudes` ADD CONSTRAINT `Etudes_commissionsId_fkey` FOREIGN KEY (`commissionsId`) REFERENCES `Commissions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
