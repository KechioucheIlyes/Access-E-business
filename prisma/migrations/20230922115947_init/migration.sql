-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(255) NULL,
    `prenom` VARCHAR(255) NULL,
    `email` VARCHAR(225) NOT NULL,
    `numero` VARCHAR(255) NULL,
    `raison_social` VARCHAR(255) NULL,
    `fonction` VARCHAR(255) NULL,
    `commentaire` TEXT NULL,
    `role` VARCHAR(255) NULL DEFAULT 'user',
    `activated` BOOLEAN NULL DEFAULT false,
    `confirmed` BOOLEAN NULL DEFAULT false,
    `fix` VARCHAR(255) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authentication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `create_time` DATETIME(0) NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `token_mail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(0) NULL,
    `token` VARCHAR(255) NULL,
    `userId` INTEGER NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Authentication` ADD CONSTRAINT `authentication_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `token_mail` ADD CONSTRAINT `token_mail_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
