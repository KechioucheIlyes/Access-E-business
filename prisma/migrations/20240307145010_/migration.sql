-- AlterTable
ALTER TABLE `Commissions` MODIFY `reference` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `Dirigeants` MODIFY `email` VARCHAR(225) NOT NULL,
    MODIFY `mobile` VARCHAR(225) NOT NULL,
    MODIFY `fixe` VARCHAR(225) NOT NULL,
    MODIFY `fonction` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `Etudes` MODIFY `statut` VARCHAR(225) NOT NULL DEFAULT 'en cours',
    MODIFY `type` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `Fournisseurs` MODIFY `nom_fournisseur` VARCHAR(225) NOT NULL,
    MODIFY `type_energie` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `Resultats` MODIFY `ctr_fournisseurs_gaz` VARCHAR(225) NOT NULL,
    MODIFY `ctr_fournisseurs_elec` VARCHAR(225) NOT NULL,
    MODIFY `ctr_est_accomp_tiers` VARCHAR(225) NULL,
    MODIFY `tx_puissance_souscrite` VARCHAR(225) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `siren` VARCHAR(225) NOT NULL;
