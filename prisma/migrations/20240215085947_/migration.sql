-- AlterTable
ALTER TABLE `filleul` ADD COLUMN `date_expiration_avantage` DATETIME(3) NULL,
    ADD COLUMN `pourcentage_promo` INTEGER NULL DEFAULT 5;
