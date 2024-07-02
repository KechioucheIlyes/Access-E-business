/*
  Warnings:

  - Made the column `create_time` on table `Authentication` required. This step will fail if there are existing NULL values in that column.
  - Made the column `create_time` on table `token_mail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Authentication` MODIFY `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `token_mail` MODIFY `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
