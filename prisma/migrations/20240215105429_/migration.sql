/*
  Warnings:

  - You are about to drop the column `montant_commission_filleul` on the `filleul` table. All the data in the column will be lost.
  - You are about to drop the column `montant_commission_parrain` on the `filleul` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `filleul` DROP COLUMN `montant_commission_filleul`,
    DROP COLUMN `montant_commission_parrain`;

-- CreateTable
CREATE TABLE `Commission_filleul` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `montant_commission_filleul` DOUBLE NOT NULL DEFAULT 0,
    `montant_commission_parrain` DOUBLE NOT NULL DEFAULT 0,
    `filleul_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Commission_filleul` ADD CONSTRAINT `Commission_filleul_filleul_id_fkey` FOREIGN KEY (`filleul_id`) REFERENCES `filleul`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
