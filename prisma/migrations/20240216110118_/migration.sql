/*
  Warnings:

  - Made the column `CSPE` on table `Commission_filleul` required. This step will fail if there are existing NULL values in that column.
  - Made the column `GBT` on table `Commission_filleul` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TURP` on table `Commission_filleul` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courtage` on table `Commission_filleul` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logiciel` on table `Commission_filleul` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Commission_filleul` MODIFY `CSPE` BOOLEAN NOT NULL,
    MODIFY `GBT` BOOLEAN NOT NULL,
    MODIFY `TURP` BOOLEAN NOT NULL,
    MODIFY `courtage` BOOLEAN NOT NULL,
    MODIFY `logiciel` BOOLEAN NOT NULL;
