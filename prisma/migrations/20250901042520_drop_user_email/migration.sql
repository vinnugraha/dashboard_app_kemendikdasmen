/*
  Warnings:

  - You are about to drop the column `output_pelibatan` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `rkk4_id` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `skala_uji_coba` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `status_operasi` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `target_pengguna` on the `application` table. All the data in the column will be lost.
  - You are about to alter the column `sistem_operasi` on the `application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(9))`.
  - You are about to drop the `rkk_1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rkk_2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rkk_3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rkk_4` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `application_rkk4_id_fkey`;

-- DropForeignKey
ALTER TABLE `rkk_2` DROP FOREIGN KEY `rkk_2_rkk1_id_fkey`;

-- DropForeignKey
ALTER TABLE `rkk_3` DROP FOREIGN KEY `rkk_3_rkk2_id_fkey`;

-- DropForeignKey
ALTER TABLE `rkk_4` DROP FOREIGN KEY `rkk_4_rkk3_id_fkey`;

-- DropIndex
DROP INDEX `application_rkk4_id_idx` ON `application`;

-- AlterTable
ALTER TABLE `application` DROP COLUMN `output_pelibatan`,
    DROP COLUMN `rkk4_id`,
    DROP COLUMN `skala_uji_coba`,
    DROP COLUMN `status_operasi`,
    DROP COLUMN `target_pengguna`,
    ADD COLUMN `basis_aplikasi` ENUM('Web', 'Desktop', 'Mobile') NULL,
    ADD COLUMN `deskripsi_aplikasi` VARCHAR(191) NULL,
    ADD COLUMN `domain_kementerian` ENUM('Kemendikdasmen', 'Kemendikbud', 'Kemendiktisaintek') NULL,
    ADD COLUMN `email_pengelola` VARCHAR(191) NULL,
    ADD COLUMN `ip_publik` VARCHAR(191) NULL,
    ADD COLUMN `jenis_layanan` ENUM('G2G', 'G2C', 'G2B') NULL,
    ADD COLUMN `kondisi_aplikasi` ENUM('Aktif dan Digunakan', 'Aktif dan Tidak Digunakan', 'Tidak Aktif tetapi Akan Digunakan', 'Tidak Aktif dan Tidak Digunakan') NULL,
    ADD COLUMN `layanan_infra` ENUM('PDNS', 'Komputasi Awan Pusdatin', 'Public Cloud Pusdatin', 'Public Cloud Mandiri', 'Hosting', 'Co-location Pusdatin Ciputat', 'Co-location Pusdatin Senayan', 'Co-location Pusdatin IDC', 'Co-location Mandiri', 'Ruang Server Mandiri') NULL,
    ADD COLUMN `model_pengembangan` ENUM('Microservices', 'Monolytic') NULL,
    ADD COLUMN `nama_pengelola` VARCHAR(191) NULL,
    ADD COLUMN `niak` VARCHAR(191) NULL,
    ADD COLUMN `nomor_bmn` VARCHAR(191) NULL,
    ADD COLUMN `nomor_hp_pengelola` VARCHAR(191) NULL,
    ADD COLUMN `nomor_pse` VARCHAR(191) NULL,
    ADD COLUMN `output_aplikasi` VARCHAR(191) NULL,
    ADD COLUMN `punya_pse` ENUM('Ya', 'Tidak') NULL,
    ADD COLUMN `raa1_id` INTEGER NULL,
    ADD COLUMN `raa2_id` INTEGER NULL,
    ADD COLUMN `raa3_id` INTEGER NULL,
    ADD COLUMN `raa4_id` INTEGER NULL,
    ADD COLUMN `rab1_id` INTEGER NULL,
    ADD COLUMN `rab2_id` INTEGER NULL,
    ADD COLUMN `rab3_id` INTEGER NULL,
    ADD COLUMN `rad1_id` INTEGER NULL,
    ADD COLUMN `rad2_id` INTEGER NULL,
    ADD COLUMN `rad3_id` INTEGER NULL,
    ADD COLUMN `rad4_id` INTEGER NULL,
    ADD COLUMN `rai1_id` INTEGER NULL,
    ADD COLUMN `rai2_id` INTEGER NULL,
    ADD COLUMN `rai3_id` INTEGER NULL,
    ADD COLUMN `rai4_id` INTEGER NULL,
    ADD COLUMN `rak1_id` INTEGER NULL,
    ADD COLUMN `rak2_id` INTEGER NULL,
    ADD COLUMN `rak3_id` INTEGER NULL,
    ADD COLUMN `rak4_id` INTEGER NULL,
    ADD COLUMN `ral1_id` INTEGER NULL,
    ADD COLUMN `ral2_id` INTEGER NULL,
    ADD COLUMN `ral3_id` INTEGER NULL,
    ADD COLUMN `ral4_id` INTEGER NULL,
    ADD COLUMN `sasaran_layanan` ENUM('Lokal', 'Nasional', 'Internasional') NULL,
    ADD COLUMN `sestama_id` INTEGER NULL,
    ADD COLUMN `singkatan_aplikasi` VARCHAR(191) NULL,
    ADD COLUMN `ssl_status` ENUM('Ya', 'Tidak') NULL,
    ADD COLUMN `termasuk_bmn` ENUM('Ya', 'Tidak') NULL,
    ADD COLUMN `tipe_lisensi` ENUM('Open Source', 'Proprietary') NULL,
    ADD COLUMN `url` VARCHAR(191) NULL,
    MODIFY `sistem_operasi` ENUM('Windows', 'Linux') NULL;

-- AlterTable
ALTER TABLE `unit_kerja` ADD COLUMN `sestama_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `sestama_id` INTEGER NULL;

-- DropTable
DROP TABLE `rkk_1`;

-- DropTable
DROP TABLE `rkk_2`;

-- DropTable
DROP TABLE `rkk_3`;

-- DropTable
DROP TABLE `rkk_4`;

-- CreateTable
CREATE TABLE `sestama` (
    `sestama_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_sestama` VARCHAR(191) NOT NULL,
    `kementerian_id` INTEGER NOT NULL,

    INDEX `sestama_kementerian_id_idx`(`kementerian_id`),
    PRIMARY KEY (`sestama_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rad_1` (
    `rad1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rad1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rad_2` (
    `rad2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rad1_id` INTEGER NOT NULL,

    INDEX `rad_2_rad1_id_idx`(`rad1_id`),
    PRIMARY KEY (`rad2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rad_3` (
    `rad3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rad2_id` INTEGER NOT NULL,

    INDEX `rad_3_rad2_id_idx`(`rad2_id`),
    PRIMARY KEY (`rad3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rad_4` (
    `rad4_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rad3_id` INTEGER NOT NULL,

    INDEX `rad_4_rad3_id_idx`(`rad3_id`),
    PRIMARY KEY (`rad4_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `raa_1` (
    `raa1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`raa1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `raa_2` (
    `raa2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `raa1_id` INTEGER NOT NULL,

    INDEX `raa_2_raa1_id_idx`(`raa1_id`),
    PRIMARY KEY (`raa2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `raa_3` (
    `raa3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `raa2_id` INTEGER NOT NULL,

    INDEX `raa_3_raa2_id_idx`(`raa2_id`),
    PRIMARY KEY (`raa3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `raa_4` (
    `raa4_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `raa3_id` INTEGER NOT NULL,

    INDEX `raa_4_raa3_id_idx`(`raa3_id`),
    PRIMARY KEY (`raa4_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rak_1` (
    `rak1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rak1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rak_2` (
    `rak2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rak1_id` INTEGER NOT NULL,

    INDEX `rak_2_rak1_id_idx`(`rak1_id`),
    PRIMARY KEY (`rak2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rak_3` (
    `rak3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rak2_id` INTEGER NOT NULL,

    INDEX `rak_3_rak2_id_idx`(`rak2_id`),
    PRIMARY KEY (`rak3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rak_4` (
    `rak4_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rak3_id` INTEGER NOT NULL,

    INDEX `rak_4_rak3_id_idx`(`rak3_id`),
    PRIMARY KEY (`rak4_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ral_1` (
    `ral1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ral1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ral_2` (
    `ral2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `ral1_id` INTEGER NOT NULL,

    INDEX `ral_2_ral1_id_idx`(`ral1_id`),
    PRIMARY KEY (`ral2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ral_3` (
    `ral3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `ral2_id` INTEGER NOT NULL,

    INDEX `ral_3_ral2_id_idx`(`ral2_id`),
    PRIMARY KEY (`ral3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ral_4` (
    `ral4_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `ral3_id` INTEGER NOT NULL,

    INDEX `ral_4_ral3_id_idx`(`ral3_id`),
    PRIMARY KEY (`ral4_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rai_1` (
    `rai1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rai1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rai_2` (
    `rai2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rai1_id` INTEGER NOT NULL,

    INDEX `rai_2_rai1_id_idx`(`rai1_id`),
    PRIMARY KEY (`rai2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rai_3` (
    `rai3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rai2_id` INTEGER NOT NULL,

    INDEX `rai_3_rai2_id_idx`(`rai2_id`),
    PRIMARY KEY (`rai3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rai_4` (
    `rai4_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rai3_id` INTEGER NOT NULL,

    INDEX `rai_4_rai3_id_idx`(`rai3_id`),
    PRIMARY KEY (`rai4_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `application_sestama_id_idx` ON `application`(`sestama_id`);

-- CreateIndex
CREATE INDEX `application_rad1_id_idx` ON `application`(`rad1_id`);

-- CreateIndex
CREATE INDEX `application_rad2_id_idx` ON `application`(`rad2_id`);

-- CreateIndex
CREATE INDEX `application_rad3_id_idx` ON `application`(`rad3_id`);

-- CreateIndex
CREATE INDEX `application_rad4_id_idx` ON `application`(`rad4_id`);

-- CreateIndex
CREATE INDEX `application_raa1_id_idx` ON `application`(`raa1_id`);

-- CreateIndex
CREATE INDEX `application_raa2_id_idx` ON `application`(`raa2_id`);

-- CreateIndex
CREATE INDEX `application_raa3_id_idx` ON `application`(`raa3_id`);

-- CreateIndex
CREATE INDEX `application_raa4_id_idx` ON `application`(`raa4_id`);

-- CreateIndex
CREATE INDEX `application_rak1_id_idx` ON `application`(`rak1_id`);

-- CreateIndex
CREATE INDEX `application_rak2_id_idx` ON `application`(`rak2_id`);

-- CreateIndex
CREATE INDEX `application_rak3_id_idx` ON `application`(`rak3_id`);

-- CreateIndex
CREATE INDEX `application_rak4_id_idx` ON `application`(`rak4_id`);

-- CreateIndex
CREATE INDEX `application_ral1_id_idx` ON `application`(`ral1_id`);

-- CreateIndex
CREATE INDEX `application_ral2_id_idx` ON `application`(`ral2_id`);

-- CreateIndex
CREATE INDEX `application_ral3_id_idx` ON `application`(`ral3_id`);

-- CreateIndex
CREATE INDEX `application_ral4_id_idx` ON `application`(`ral4_id`);

-- CreateIndex
CREATE INDEX `application_rab1_id_idx` ON `application`(`rab1_id`);

-- CreateIndex
CREATE INDEX `application_rab2_id_idx` ON `application`(`rab2_id`);

-- CreateIndex
CREATE INDEX `application_rab3_id_idx` ON `application`(`rab3_id`);

-- CreateIndex
CREATE INDEX `application_rai1_id_idx` ON `application`(`rai1_id`);

-- CreateIndex
CREATE INDEX `application_rai2_id_idx` ON `application`(`rai2_id`);

-- CreateIndex
CREATE INDEX `application_rai3_id_idx` ON `application`(`rai3_id`);

-- CreateIndex
CREATE INDEX `application_rai4_id_idx` ON `application`(`rai4_id`);

-- CreateIndex
CREATE INDEX `unit_kerja_sestama_id_idx` ON `unit_kerja`(`sestama_id`);

-- CreateIndex
CREATE INDEX `users_sestama_id_idx` ON `users`(`sestama_id`);

-- AddForeignKey
ALTER TABLE `sestama` ADD CONSTRAINT `sestama_kementerian_id_fkey` FOREIGN KEY (`kementerian_id`) REFERENCES `kementerian`(`kementerian_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit_kerja` ADD CONSTRAINT `unit_kerja_sestama_id_fkey` FOREIGN KEY (`sestama_id`) REFERENCES `sestama`(`sestama_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_sestama_id_fkey` FOREIGN KEY (`sestama_id`) REFERENCES `sestama`(`sestama_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rad_2` ADD CONSTRAINT `rad_2_rad1_id_fkey` FOREIGN KEY (`rad1_id`) REFERENCES `rad_1`(`rad1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rad_3` ADD CONSTRAINT `rad_3_rad2_id_fkey` FOREIGN KEY (`rad2_id`) REFERENCES `rad_2`(`rad2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rad_4` ADD CONSTRAINT `rad_4_rad3_id_fkey` FOREIGN KEY (`rad3_id`) REFERENCES `rad_3`(`rad3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `raa_2` ADD CONSTRAINT `raa_2_raa1_id_fkey` FOREIGN KEY (`raa1_id`) REFERENCES `raa_1`(`raa1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `raa_3` ADD CONSTRAINT `raa_3_raa2_id_fkey` FOREIGN KEY (`raa2_id`) REFERENCES `raa_2`(`raa2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `raa_4` ADD CONSTRAINT `raa_4_raa3_id_fkey` FOREIGN KEY (`raa3_id`) REFERENCES `raa_3`(`raa3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rak_2` ADD CONSTRAINT `rak_2_rak1_id_fkey` FOREIGN KEY (`rak1_id`) REFERENCES `rak_1`(`rak1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rak_3` ADD CONSTRAINT `rak_3_rak2_id_fkey` FOREIGN KEY (`rak2_id`) REFERENCES `rak_2`(`rak2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rak_4` ADD CONSTRAINT `rak_4_rak3_id_fkey` FOREIGN KEY (`rak3_id`) REFERENCES `rak_3`(`rak3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ral_2` ADD CONSTRAINT `ral_2_ral1_id_fkey` FOREIGN KEY (`ral1_id`) REFERENCES `ral_1`(`ral1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ral_3` ADD CONSTRAINT `ral_3_ral2_id_fkey` FOREIGN KEY (`ral2_id`) REFERENCES `ral_2`(`ral2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ral_4` ADD CONSTRAINT `ral_4_ral3_id_fkey` FOREIGN KEY (`ral3_id`) REFERENCES `ral_3`(`ral3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rai_2` ADD CONSTRAINT `rai_2_rai1_id_fkey` FOREIGN KEY (`rai1_id`) REFERENCES `rai_1`(`rai1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rai_3` ADD CONSTRAINT `rai_3_rai2_id_fkey` FOREIGN KEY (`rai2_id`) REFERENCES `rai_2`(`rai2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rai_4` ADD CONSTRAINT `rai_4_rai3_id_fkey` FOREIGN KEY (`rai3_id`) REFERENCES `rai_3`(`rai3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_sestama_id_fkey` FOREIGN KEY (`sestama_id`) REFERENCES `sestama`(`sestama_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rad4_id_fkey` FOREIGN KEY (`rad4_id`) REFERENCES `rad_4`(`rad4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_raa4_id_fkey` FOREIGN KEY (`raa4_id`) REFERENCES `raa_4`(`raa4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rak4_id_fkey` FOREIGN KEY (`rak4_id`) REFERENCES `rak_4`(`rak4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_ral4_id_fkey` FOREIGN KEY (`ral4_id`) REFERENCES `ral_4`(`ral4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rai4_id_fkey` FOREIGN KEY (`rai4_id`) REFERENCES `rai_4`(`rai4_id`) ON DELETE SET NULL ON UPDATE CASCADE;
