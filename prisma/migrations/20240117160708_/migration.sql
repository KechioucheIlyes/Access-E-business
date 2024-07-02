/*
  Warnings:

  - You are about to drop the column `batiment_reponse` on the `Resultats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reference]` on the table `Commissions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Resultats` DROP COLUMN `batiment_reponse`;

-- CreateIndex
CREATE UNIQUE INDEX `Commissions_reference_key` ON `Commissions`(`reference`);
