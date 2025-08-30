-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
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
    `nama_kab_kota` VARCHAR(191) NOT NULL,
    `provinsi_id` INTEGER NOT NULL,

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
CREATE TABLE `database` (
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
CREATE TABLE `kementerian` (
    `kementerian_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kementerian` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`kementerian_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit_kerja` (
    `unit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_unit` VARCHAR(191) NOT NULL,
    `kementerian_id` INTEGER NOT NULL,

    INDEX `unit_kerja_kementerian_id_idx`(`kementerian_id`),
    PRIMARY KEY (`unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    INDEX `users_role_id_idx`(`role_id`),
    INDEX `users_unit_id_idx`(`unit_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rkk_1` (
    `rkk1_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rkk1_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rkk_2` (
    `rkk2_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rkk1_id` INTEGER NOT NULL,

    INDEX `rkk_2_rkk1_id_idx`(`rkk1_id`),
    PRIMARY KEY (`rkk2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rkk_3` (
    `rkk3_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rkk2_id` INTEGER NOT NULL,

    INDEX `rkk_3_rkk2_id_idx`(`rkk2_id`),
    PRIMARY KEY (`rkk3_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rkk_4` (
    `rkk4_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `rkk3_id` INTEGER NOT NULL,

    INDEX `rkk_4_rkk3_id_idx`(`rkk3_id`),
    PRIMARY KEY (`rkk4_id`)
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
CREATE TABLE `application` (
    `application_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_aplikasi` VARCHAR(191) NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `output_pelibatan` VARCHAR(191) NULL,
    `target_pengguna` VARCHAR(191) NULL,
    `status_operasi` VARCHAR(191) NULL,
    `skala_uji_coba` VARCHAR(191) NULL,
    `sistem_operasi` VARCHAR(191) NULL,
    `provinsi_id` INTEGER NULL,
    `kab_kota_id` INTEGER NULL,
    `bahasa_id` INTEGER NULL,
    `framework_id` INTEGER NULL,
    `metode_id` INTEGER NULL,
    `database_id` INTEGER NULL,
    `user_layanan_id` INTEGER NULL,
    `rkk4_id` INTEGER NULL,
    `rab4_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `application_unit_id_idx`(`unit_id`),
    INDEX `application_provinsi_id_idx`(`provinsi_id`),
    INDEX `application_kab_kota_id_idx`(`kab_kota_id`),
    INDEX `application_bahasa_id_idx`(`bahasa_id`),
    INDEX `application_framework_id_idx`(`framework_id`),
    INDEX `application_metode_id_idx`(`metode_id`),
    INDEX `application_database_id_idx`(`database_id`),
    INDEX `application_user_layanan_id_idx`(`user_layanan_id`),
    INDEX `application_rkk4_id_idx`(`rkk4_id`),
    INDEX `application_rab4_id_idx`(`rab4_id`),
    PRIMARY KEY (`application_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kab_kota` ADD CONSTRAINT `kab_kota_provinsi_id_fkey` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi`(`provinsi_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit_kerja` ADD CONSTRAINT `unit_kerja_kementerian_id_fkey` FOREIGN KEY (`kementerian_id`) REFERENCES `kementerian`(`kementerian_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit_kerja`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rkk_2` ADD CONSTRAINT `rkk_2_rkk1_id_fkey` FOREIGN KEY (`rkk1_id`) REFERENCES `rkk_1`(`rkk1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rkk_3` ADD CONSTRAINT `rkk_3_rkk2_id_fkey` FOREIGN KEY (`rkk2_id`) REFERENCES `rkk_2`(`rkk2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rkk_4` ADD CONSTRAINT `rkk_4_rkk3_id_fkey` FOREIGN KEY (`rkk3_id`) REFERENCES `rkk_3`(`rkk3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rab_2` ADD CONSTRAINT `rab_2_rab1_id_fkey` FOREIGN KEY (`rab1_id`) REFERENCES `rab_1`(`rab1_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rab_3` ADD CONSTRAINT `rab_3_rab2_id_fkey` FOREIGN KEY (`rab2_id`) REFERENCES `rab_2`(`rab2_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rab_4` ADD CONSTRAINT `rab_4_rab3_id_fkey` FOREIGN KEY (`rab3_id`) REFERENCES `rab_3`(`rab3_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit_kerja`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_provinsi_id_fkey` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi`(`provinsi_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_kab_kota_id_fkey` FOREIGN KEY (`kab_kota_id`) REFERENCES `kab_kota`(`kab_kota_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_bahasa_id_fkey` FOREIGN KEY (`bahasa_id`) REFERENCES `bahasa`(`bahasa_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_framework_id_fkey` FOREIGN KEY (`framework_id`) REFERENCES `framework`(`framework_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_metode_id_fkey` FOREIGN KEY (`metode_id`) REFERENCES `metode_pengembangan`(`metode_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_database_id_fkey` FOREIGN KEY (`database_id`) REFERENCES `database`(`database_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_user_layanan_id_fkey` FOREIGN KEY (`user_layanan_id`) REFERENCES `pengguna_layanan`(`user_layanan_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rkk4_id_fkey` FOREIGN KEY (`rkk4_id`) REFERENCES `rkk_4`(`rkk4_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_rab4_id_fkey` FOREIGN KEY (`rab4_id`) REFERENCES `rab_4`(`rab4_id`) ON DELETE SET NULL ON UPDATE CASCADE;
