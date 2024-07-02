-- AlterTable
ALTER TABLE `Commissions` ADD COLUMN `Date_signature_CSPE` DATETIME(3) NULL,
    ADD COLUMN `Date_signature_GBT` DATETIME(3) NULL,
    ADD COLUMN `Date_signature_TURP` DATETIME(3) NULL,
    ADD COLUMN `Date_signature_courtage` DATETIME(3) NULL,
    ADD COLUMN `Date_signature_logiciel` DATETIME(3) NULL;
