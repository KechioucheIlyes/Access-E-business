/*
  Warnings:

  - You are about to alter the column `rg_bacs_ne_sais_pas` on the `Resultats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(225)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Resultats` MODIFY `rg_bacs_ne_sais_pas` BOOLEAN NULL;
