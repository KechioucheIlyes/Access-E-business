/*
  Warnings:

  - Added the required column `siren` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prenom` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `raison_social` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fonction` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `affiliated_by` INTEGER NULL,
    ADD COLUMN `affiliation_id` INTEGER NULL,
    ADD COLUMN `modifier_le` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `siren` VARCHAR(10) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `prenom` VARCHAR(255) NOT NULL,
    MODIFY `numero` VARCHAR(255) NOT NULL,
    MODIFY `raison_social` VARCHAR(255) NOT NULL,
    MODIFY `fonction` VARCHAR(255) NOT NULL,
    MODIFY `role` VARCHAR(255) NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `Dirigeants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `civilite` CHAR(255) NOT NULL,
    `nom` VARCHAR(225) NOT NULL,
    `prenom` VARCHAR(225) NOT NULL,
    `date_naissance` DATETIME(3) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `mobile` VARCHAR(15) NOT NULL,
    `fixe` VARCHAR(15) NOT NULL,
    `fonction` VARCHAR(30) NOT NULL,
    `signataire` BOOLEAN NOT NULL,
    `decisionnaire` BOOLEAN NOT NULL,
    `signature_fichier` VARCHAR(225) NULL DEFAULT 'default',
    `ID_clients` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(25) NOT NULL,
    `courtage` BOOLEAN NOT NULL,
    `TURP` BOOLEAN NOT NULL,
    `CSPE` BOOLEAN NOT NULL,
    `logiciel` BOOLEAN NOT NULL,
    `GBT` BOOLEAN NOT NULL,
    `Date_signature` DATETIME(3) NOT NULL,
    `montant_commission` DOUBLE NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siret` VARCHAR(220) NOT NULL,
    `raison_sociale` VARCHAR(1020) NOT NULL,
    `code_naf` VARCHAR(220) NOT NULL,
    `adresse_postal` VARCHAR(220) NOT NULL,
    `ville` VARCHAR(220) NOT NULL,
    `code_postal` VARCHAR(220) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `secteur_activite` VARCHAR(220) NULL,

    UNIQUE INDEX `Clients_siret_key`(`siret`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etudes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_etude` VARCHAR(225) NOT NULL,
    `date_debut` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_fin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statut` VARCHAR(35) NOT NULL DEFAULT 'en cours',
    `type` VARCHAR(50) NOT NULL,
    `ID_clients` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference_contrat` VARCHAR(25) NOT NULL,
    `nom_site` VARCHAR(80) NOT NULL,
    `fournisseur` VARCHAR(45) NOT NULL,
    `date_echeance` DATETIME(3) NULL,
    `type_contrat` VARCHAR(15) NOT NULL,
    `fichier_contrat` VARCHAR(225) NOT NULL,
    `id_etudes` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(225) NOT NULL,
    `nom_fournisseur` VARCHAR(35) NOT NULL,
    `type_energie` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resultats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noteGlobal` VARCHAR(50) NULL,
    `noteCategorieAnalyse` VARCHAR(50) NULL,
    `noteCategorieTaxes` VARCHAR(50) NULL,
    `noteCategorieEconomiesEnergie` VARCHAR(50) NULL,
    `noteCategorieReglementaire` VARCHAR(50) NULL,
    `CSPE` BOOLEAN NULL,
    `ctr_nb_compteur_gaz` INTEGER NOT NULL,
    `ctr_nb_compteur_elec` INTEGER NOT NULL,
    `ctr_fournisseurs_gaz` VARCHAR(100) NOT NULL,
    `ctr_fournisseurs_elec` VARCHAR(100) NOT NULL,
    `ctr_ARENH` BOOLEAN NULL,
    `ctr_renegociation` BOOLEAN NULL,
    `ctr_duree_engage_definit` BOOLEAN NULL,
    `ctr_est_accomp_tiers` VARCHAR(120) NULL,
    `tx_puissance_souscrite` VARCHAR(120) NULL,
    `tx_formule_tarifaire` BOOLEAN NULL,
    `tx_subis_penalites` BOOLEAN NULL,
    `tx_surfacturation` BOOLEAN NULL,
    `tx_coherence_puissance_1` BOOLEAN NULL,
    `tx_periodique_1_1` BOOLEAN NULL,
    `tx_code_naf_eligible` BOOLEAN NULL,
    `tx_cspe_eligible` BOOLEAN NULL,
    `ec_reduc_consom` BOOLEAN NULL,
    `ec_mesures_econom` VARCHAR(225) NOT NULL,
    `ec_actions_econom` VARCHAR(225) NOT NULL,
    `ec_outils_mesure_conso` BOOLEAN NULL,
    `rg_adheresion_tertiaire_1` BOOLEAN NULL,
    `rg_adheresion_tertiaire_1_ne_sais_pas` BOOLEAN NULL,
    `rg_operate_tertiaire_oui_01` BOOLEAN NULL,
    `rg_oblig_obj_tertiaire_oui_01` BOOLEAN NULL,
    `rg_inconnu_tertiaire_non_01` BOOLEAN NULL,
    `rg_bis_1k_tertiaire_non_01` BOOLEAN NULL,
    `rg_bacs_oui_01` BOOLEAN NULL,
    `rg_bacs_outils_oui_01` BOOLEAN NULL,
    `rg_bacs_non_01` BOOLEAN NULL,
    `rg_bacs_ne_sais_pas` VARCHAR(225) NULL,
    `id_etudes` INTEGER NOT NULL,

    UNIQUE INDEX `Resultats_id_etudes_key`(`id_etudes`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dirigeants` ADD CONSTRAINT `Dirigeants_ID_clients_fkey` FOREIGN KEY (`ID_clients`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commissions` ADD CONSTRAINT `Commissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etudes` ADD CONSTRAINT `Etudes_ID_clients_fkey` FOREIGN KEY (`ID_clients`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrats` ADD CONSTRAINT `Contrats_id_etudes_fkey` FOREIGN KEY (`id_etudes`) REFERENCES `Etudes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resultats` ADD CONSTRAINT `Resultats_id_etudes_fkey` FOREIGN KEY (`id_etudes`) REFERENCES `Etudes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
