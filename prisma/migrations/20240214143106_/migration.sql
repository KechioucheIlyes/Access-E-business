/*
  Warnings:

  - A unique constraint covering the columns `[lien_affiliation]` on the table `filleul` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `lien` ON `filleul`(`lien_affiliation`);
