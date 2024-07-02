/*
  Warnings:

  - Made the column `date_echeance` on table `Contrats` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contrats` MODIFY `reference_contrat` VARCHAR(225) NOT NULL,
    MODIFY `nom_site` VARCHAR(225) NOT NULL,
    MODIFY `fournisseur` VARCHAR(225) NOT NULL,
    MODIFY `date_echeance` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `type_contrat` VARCHAR(225) NOT NULL DEFAULT 'prestation',
    MODIFY `fichier_contrat` VARCHAR(225) NULL;
