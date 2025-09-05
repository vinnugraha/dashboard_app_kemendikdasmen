-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kementerian` (
    `kementerian_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kementerian` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`kementerian_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sestama` (
    `sestama_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_sestama` VARCHAR(191) NOT NULL,
    `kementerian_id` INTEGER NOT NULL,

    INDEX `sestama_kementerian_id_idx`(`kementerian_id`),
    PRIMARY KEY (`sestama_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit_kerja` (
    `unit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_unit` VARCHAR(191) NOT NULL,
    `kementerian_id` INTEGER NOT NULL,
    `sestama_id` INTEGER NULL,

    INDEX `unit_kerja_kementerian_id_idx`(`kementerian_id`),
    INDEX `unit_kerja_sestama_id_idx`(`sestama_id`),
    PRIMARY KEY (`unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `sestama_id` INTEGER NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    INDEX `users_role_id_idx`(`role_id`),
    INDEX `users_unit_id_idx`(`unit_id`),
    INDEX `users_sestama_id_idx`(`sestama_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provinsi` (
    `provinsi_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_provinsi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`provinsi_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kab_kota` (
    `kab_kota_id` INTEGER NOT NULL AUTO_INCREMENT,
    `provinsi_id` INTEGER NOT NULL,
    `nama_kabupaten_kota` VARCHAR(191) NULL,

    INDEX `kab_kota_provinsi_id_idx`(`provinsi_id`),
    PRIMARY KEY (`kab_kota_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bahasa` (
    `bahasa_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_bahasa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bahasa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `framework` (
    `framework_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_framework` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`framework_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metode_pengembangan` (
    `metode_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_metode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`metode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `database_list` (
    `database_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_database` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`database_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengguna_layanan` (
    `user_layanan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pengguna_layanan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_layanan_id`)
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
CREATE TABLE `rab_1` (
    `rab1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rab1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rab_2` (
    `rab2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rab1_id` INTEGER NOT NULL,

    INDEX `rab_2_rab1_id_idx`(`rab1_id`),
    PRIMARY KEY (`rab2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rab_3` (
    `rab3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rab2_id` INTEGER NOT NULL,

    INDEX `rab_3_rab2_id_idx`(`rab2_id`),
    PRIMARY KEY (`rab3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rab_4` (
    `rab4_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rab3_id` INTEGER NOT NULL,

    INDEX `rab_4_rab3_id_idx`(`rab3_id`),
    PRIMARY KEY (`rab4_id`)
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

-- CreateTable
CREATE TABLE `application` (
    `application_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_aplikasi` VARCHAR(191) NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `sistem_operasi` ENUM('Windows', 'Linux') NULL,
    `provinsi_id` INTEGER NULL,
    `kab_kota_id` INTEGER NULL,
    `bahasa_id` INTEGER NULL,
    `framework_id` INTEGER NULL,
    `metode_id` INTEGER NULL,
    `database_id` INTEGER NULL,
    `user_layanan_id` INTEGER NULL,
    `rab4_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `basis_aplikasi` ENUM('Web', 'Desktop', 'Mobile') NULL,
    `deskripsi_aplikasi` VARCHAR(191) NULL,
    `domain_kementerian` ENUM('Kemendikdasmen', 'Kemendikbud', 'Kemendiktisaintek') NULL,
    `email_pengelola` VARCHAR(191) NULL,
    `ip_publik` VARCHAR(191) NULL,
    `jenis_layanan` ENUM('G2G', 'G2C', 'G2B') NULL,
    `kondisi_aplikasi` ENUM('Aktif dan Digunakan', 'Aktif dan Tidak Digunakan', 'Tidak Aktif tetapi Akan Digunakan', 'Tidak Aktif dan Tidak Digunakan') NULL,
    `layanan_infra` ENUM('PDNS', 'Komputasi Awan Pusdatin', 'Public Cloud Pusdatin', 'Public Cloud Mandiri', 'Hosting', 'Co-location Pusdatin Ciputat', 'Co-location Pusdatin Senayan', 'Co-location Pusdatin IDC', 'Co-location Mandiri', 'Ruang Server Mandiri') NULL,
    `model_pengembangan` ENUM('Microservices', 'Monolytic') NULL,
    `nama_pengelola` VARCHAR(191) NULL,
    `nia` VARCHAR(191) NULL,
    `nomor_bmn` VARCHAR(191) NULL,
    `nomor_hp_pengelola` VARCHAR(191) NULL,
    `nomor_pse` VARCHAR(191) NULL,
    `output_aplikasi` VARCHAR(191) NULL,
    `punya_pse` ENUM('Ya', 'Tidak') NULL,
    `raa1_id` INTEGER NULL,
    `raa2_id` INTEGER NULL,
    `raa3_id` INTEGER NULL,
    `raa4_id` INTEGER NULL,
    `rab1_id` INTEGER NULL,
    `rab2_id` INTEGER NULL,
    `rab3_id` INTEGER NULL,
    `rad1_id` INTEGER NULL,
    `rad2_id` INTEGER NULL,
    `rad3_id` INTEGER NULL,
    `rad4_id` INTEGER NULL,
    `rai1_id` INTEGER NULL,
    `rai2_id` INTEGER NULL,
    `rai3_id` INTEGER NULL,
    `rai4_id` INTEGER NULL,
    `rak1_id` INTEGER NULL,
    `rak2_id` INTEGER NULL,
    `rak3_id` INTEGER NULL,
    `rak4_id` INTEGER NULL,
    `ral1_id` INTEGER NULL,
    `ral2_id` INTEGER NULL,
    `ral3_id` INTEGER NULL,
    `ral4_id` INTEGER NULL,
    `sasaran_layanan` ENUM('Lokal', 'Nasional', 'Internasional') NULL,
    `sestama_id` INTEGER NULL,
    `singkatan_aplikasi` VARCHAR(191) NULL,
    `ssl_status` ENUM('Ya', 'Tidak') NULL,
    `termasuk_bmn` ENUM('Ya', 'Tidak') NULL,
    `tipe_lisensi` ENUM('Open Source', 'Proprietary') NULL,
    `url` VARCHAR(191) NULL,

    INDEX `application_unit_id_idx`(`unit_id`),
    INDEX `application_sestama_id_idx`(`sestama_id`),
    INDEX `application_provinsi_id_idx`(`provinsi_id`),
    INDEX `application_kab_kota_id_idx`(`kab_kota_id`),
    INDEX `application_user_layanan_id_idx`(`user_layanan_id`),
    INDEX `application_bahasa_id_idx`(`bahasa_id`),
    INDEX `application_framework_id_idx`(`framework_id`),
    INDEX `application_metode_id_idx`(`metode_id`),
    INDEX `application_database_id_idx`(`database_id`),
    INDEX `application_rad1_id_idx`(`rad1_id`),
    INDEX `application_rad2_id_idx`(`rad2_id`),
    INDEX `application_rad3_id_idx`(`rad3_id`),
    INDEX `application_rad4_id_idx`(`rad4_id`),
    INDEX `application_raa1_id_idx`(`raa1_id`),
    INDEX `application_raa2_id_idx`(`raa2_id`),
    INDEX `application_raa3_id_idx`(`raa3_id`),
    INDEX `application_raa4_id_idx`(`raa4_id`),
    INDEX `application_rak1_id_idx`(`rak1_id`),
    INDEX `application_rak2_id_idx`(`rak2_id`),
    INDEX `application_rak3_id_idx`(`rak3_id`),
    INDEX `application_rak4_id_idx`(`rak4_id`),
    INDEX `application_ral1_id_idx`(`ral1_id`),
    INDEX `application_ral2_id_idx`(`ral2_id`),
    INDEX `application_ral3_id_idx`(`ral3_id`),
    INDEX `application_ral4_id_idx`(`ral4_id`),
    INDEX `application_rab1_id_idx`(`rab1_id`),
    INDEX `application_rab2_id_idx`(`rab2_id`),
    INDEX `application_rab3_id_idx`(`rab3_id`),
    INDEX `application_rab4_id_idx`(`rab4_id`),
    INDEX `application_rai1_id_idx`(`rai1_id`),
    INDEX `application_rai2_id_idx`(`rai2_id`),
    INDEX `application_rai3_id_idx`(`rai3_id`),
    INDEX `application_rai4_id_idx`(`rai4_id`),
    PRIMARY KEY (`application_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sestama` ADD CONSTRAINT `sestama_kementerian_id_fkey` FOREIGN KEY (`kementerian_id`) REFERENCES `kementerian`(`kementerian_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit_kerja` ADD CONSTRAINT `unit_kerja_kementerian_id_fkey` FOREIGN KEY (`kementerian_id`) REFERENCES `kementerian`(`kementerian_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit_kerja` ADD CONSTRAINT `unit_kerja_sestama_id_fkey` FOREIGN KEY (`sestama_id`) REFERENCES `sestama`(`sestama_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_sestama_id_fkey` FOREIGN KEY (`sestama_id`) REFERENCES `sestama`(`sestama_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit_kerja`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kab_kota` ADD CONSTRAINT `kab_kota_provinsi_id_fkey` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi`(`provinsi_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `rab_2` ADD CONSTRAINT `rab_2_rab1_id_fkey` FOREIGN KEY (`rab1_id`) REFERENCES `rab_1`(`rab1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rab_3` ADD CONSTRAINT `rab_3_rab2_id_fkey` FOREIGN KEY (`rab2_id`) REFERENCES `rab_2`(`rab2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rab_4` ADD CONSTRAINT `rab_4_rab3_id_fkey` FOREIGN KEY (`rab3_id`) REFERENCES `rab_3`(`rab3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rai_2` ADD CONSTRAINT `rai_2_rai1_id_fkey` FOREIGN KEY (`rai1_id`) REFERENCES `rai_1`(`rai1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rai_3` ADD CONSTRAINT `rai_3_rai2_id_fkey` FOREIGN KEY (`rai2_id`) REFERENCES `rai_2`(`rai2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rai_4` ADD CONSTRAINT `rai_4_rai3_id_fkey` FOREIGN KEY (`rai3_id`) REFERENCES `rai_3`(`rai3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_bahasa_id_fkey` FOREIGN KEY (`bahasa_id`) REFERENCES `bahasa`(`bahasa_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_database_id_fkey` FOREIGN KEY (`database_id`) REFERENCES `database_list`(`database_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_framework_id_fkey` FOREIGN KEY (`framework_id`) REFERENCES `framework`(`framework_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_kab_kota_id_fkey` FOREIGN KEY (`kab_kota_id`) REFERENCES `kab_kota`(`kab_kota_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_metode_id_fkey` FOREIGN KEY (`metode_id`) REFERENCES `metode_pengembangan`(`metode_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_provinsi_id_fkey` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi`(`provinsi_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_raa4_id_fkey` FOREIGN KEY (`raa4_id`) REFERENCES `raa_4`(`raa4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rab4_id_fkey` FOREIGN KEY (`rab4_id`) REFERENCES `rab_4`(`rab4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rad4_id_fkey` FOREIGN KEY (`rad4_id`) REFERENCES `rad_4`(`rad4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rai4_id_fkey` FOREIGN KEY (`rai4_id`) REFERENCES `rai_4`(`rai4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rak4_id_fkey` FOREIGN KEY (`rak4_id`) REFERENCES `rak_4`(`rak4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_ral4_id_fkey` FOREIGN KEY (`ral4_id`) REFERENCES `ral_4`(`ral4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_sestama_id_fkey` FOREIGN KEY (`sestama_id`) REFERENCES `sestama`(`sestama_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit_kerja`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_user_layanan_id_fkey` FOREIGN KEY (`user_layanan_id`) REFERENCES `pengguna_layanan`(`user_layanan_id`) ON DELETE SET NULL ON UPDATE CASCADE;

