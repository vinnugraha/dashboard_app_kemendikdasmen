-- Create database schema for Kemendikdasmen Application Dashboard
-- Based on the provided ERD and requirements

-- Create kementerian table
CREATE TABLE IF NOT EXISTS kementerian (
    kementerian_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_kementerian VARCHAR(255) NOT NULL
);

-- Create role table
CREATE TABLE IF NOT EXISTS role (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Create sestama table
CREATE TABLE IF NOT EXISTS sestama (
    sestama_id INT PRIMARY KEY,
    nama_sestama VARCHAR(255) NOT NULL,
    kementerian_id INT,
    FOREIGN KEY (kementerian_id) REFERENCES kementerian(kementerian_id)
);

-- Create unit_kerja table
CREATE TABLE IF NOT EXISTS unit_kerja (
    unit_id INT PRIMARY KEY,
    nama_unit VARCHAR(255) NOT NULL,
    kementerian_id INT,
    sestama_id INT,
    FOREIGN KEY (kementerian_id) REFERENCES kementerian(kementerian_id),
    FOREIGN KEY (sestama_id) REFERENCES sestama(sestama_id)
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT,
    sestama_id INT NULL,
    unit_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (sestama_id) REFERENCES sestama(sestama_id),
    FOREIGN KEY (unit_id) REFERENCES unit_kerja(unit_id)
);

-- Create provinsi table
CREATE TABLE IF NOT EXISTS provinsi (
    provinsi_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_provinsi VARCHAR(100) NOT NULL
);

-- Create kabupaten_kota table
CREATE TABLE IF NOT EXISTS kabupaten_kota (
    kab_kota_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_kab_kota VARCHAR(100) NOT NULL,
    provinsi_id INT,
    FOREIGN KEY (provinsi_id) REFERENCES provinsi(provinsi_id)
);

-- Create pengguna_layanan table
CREATE TABLE IF NOT EXISTS pengguna_layanan (
    user_layanan_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_pengguna_layanan VARCHAR(100) NOT NULL
);

-- Create bahasa table
CREATE TABLE IF NOT EXISTS bahasa (
    bahasa_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_bahasa VARCHAR(100) NOT NULL
);

-- Create framework table
CREATE TABLE IF NOT EXISTS framework (
    framework_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_framework VARCHAR(100) NOT NULL
);

-- Create metode_pengembangan table
CREATE TABLE IF NOT EXISTS metode_pengembangan (
    metode_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_metode VARCHAR(100) NOT NULL
);

-- Create database table
CREATE TABLE IF NOT EXISTS database_type (
    database_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_database VARCHAR(100) NOT NULL
);

-- Create application table (main table)
CREATE TABLE IF NOT EXISTS application (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(500),
    niak VARCHAR(100),
    nama_aplikasi VARCHAR(255) NOT NULL,
    deskripsi_aplikasi TEXT,
    output_aplikasi TEXT,
    nama_pic_pengelola VARCHAR(255),
    nomor_pic_pengelola VARCHAR(20),
    email_pengelola VARCHAR(255),
    unit_id INT,
    sestama_id INT,
    singkatan_aplikasi VARCHAR(50),
    kondisi_aplikasi ENUM('Aktif', 'Tidak Aktif', 'Maintenance') DEFAULT 'Aktif',
    jenis_layanan ENUM('Internal', 'Eksternal', 'Hybrid') DEFAULT 'Internal',
    sasaran_layanan VARCHAR(255),
    pengguna_layanan_id INT,
    basis_aplikasi ENUM('Web', 'Mobile', 'Desktop', 'Hybrid') DEFAULT 'Web',
    tipe_lisensi_aplikasi ENUM('Open Source', 'Proprietary', 'Commercial') DEFAULT 'Proprietary',
    bahasa_id INT,
    framework_id INT,
    metode_id INT,
    model_pengembangan ENUM('Waterfall', 'Agile', 'DevOps', 'Hybrid') DEFAULT 'Agile',
    database_id INT,
    operation_system VARCHAR(100),
    layanan_infrastruktur VARCHAR(255),
    status_ssl ENUM('Active', 'Inactive', 'Expired') DEFAULT 'Active',
    provinsi_id INT,
    kab_kota_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES unit_kerja(unit_id),
    FOREIGN KEY (sestama_id) REFERENCES sestama(sestama_id),
    FOREIGN KEY (pengguna_layanan_id) REFERENCES pengguna_layanan(user_layanan_id),
    FOREIGN KEY (bahasa_id) REFERENCES bahasa(bahasa_id),
    FOREIGN KEY (framework_id) REFERENCES framework(framework_id),
    FOREIGN KEY (metode_id) REFERENCES metode_pengembangan(metode_id),
    FOREIGN KEY (database_id) REFERENCES database_type(database_id),
    FOREIGN KEY (provinsi_id) REFERENCES provinsi(provinsi_id),
    FOREIGN KEY (kab_kota_id) REFERENCES kabupaten_kota(kab_kota_id)
);
