-- CreateTable
CREATE TABLE `filleul` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `raison_sociale` VARCHAR(225) NOT NULL,
    `secteur_activite` VARCHAR(225) NOT NULL,
    `nom` VARCHAR(225) NOT NULL,
    `prenom` VARCHAR(225) NOT NULL,
    `fonction` VARCHAR(225) NOT NULL,
    `email` VARCHAR(225) NOT NULL,
    `fixe` VARCHAR(225) NOT NULL,
    `mobile` VARCHAR(225) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `affiliated` BOOLEAN NOT NULL DEFAULT false,
    `date_affilation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actif` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `lien_affiliation` VARCHAR(225) NULL,
    `date_expiration` DATETIME(3) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `filleul` ADD CONSTRAINT `filleul_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
