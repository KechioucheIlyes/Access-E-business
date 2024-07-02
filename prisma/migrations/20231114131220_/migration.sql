/*
  Warnings:

  - You are about to alter the column `noteGlobal` on the `Resultats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - You are about to alter the column `noteCategorieAnalyse` on the `Resultats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - You are about to alter the column `noteCategorieTaxes` on the `Resultats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - You are about to alter the column `noteCategorieEconomiesEnergie` on the `Resultats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - You are about to alter the column `noteCategorieReglementaire` on the `Resultats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Resultats` MODIFY `noteGlobal` INTEGER NULL,
    MODIFY `noteCategorieAnalyse` INTEGER NULL,
    MODIFY `noteCategorieTaxes` INTEGER NULL,
    MODIFY `noteCategorieEconomiesEnergie` INTEGER NULL,
    MODIFY `noteCategorieReglementaire` INTEGER NULL;
