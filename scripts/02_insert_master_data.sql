-- Insert master data for Kemendikdasmen Application Dashboard

-- Insert kementerian data
INSERT INTO kementerian (kementerian_id, nama_kementerian) VALUES 
(1, 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi');

-- Insert role data
INSERT INTO role (role_id, role_name, description) VALUES 
(1, 'super_admin', 'Super Administrator dengan akses penuh'),
(2, 'admin', 'Administrator sistem'),
(3, 'sestama', 'Sestama - Melihat aplikasi per unit_kerja naungannya'),
(4, 'unit_kerja', 'Unit Kerja - Melihat aplikasi unit kerja masing-masing');

-- Insert sestama data
INSERT INTO sestama (sestama_id, nama_sestama, kementerian_id) VALUES 
(1, 'Sekretariat Jenderal', 1),
(2, 'Direktorat Jenderal Guru, Tenaga Kependidikan, dan Pendidikan Guru', 1),
(3, 'Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah', 1),
(4, 'Direktorat Jenderal Pendidikan Vokasi, Pendidikan Khusus, dan Pendidikan Layanan Khusus', 1),
(5, 'Inspektorat Jenderal', 1),
(6, 'Badan Standar, Kurikulum, dan Asesmen Pendidikan', 1),
(7, 'Badan Pengembangan dan Pembinaan Bahasa', 1);

-- Insert unit_kerja data (first 20 units for brevity)
INSERT INTO unit_kerja (unit_id, nama_unit, kementerian_id, sestama_id) VALUES 
(1, 'Pusat Data dan Teknologi Informasi', 1, 1),
(2, 'Pusat Pelatihan Sumber Daya Manusia', 1, 1),
(3, 'Pusat Prestasi Nasional', 1, 1),
(4, 'Pusat Penguatan Karakter', 1, 1),
(5, 'Pusat Layanan Pembiayaan Pendidikan', 1, 1),
(6, 'Biro Perencanaan dan Kerja Sama', 1, 1),
(7, 'Biro Keuangan dan Barang Milik Negara', 1, 1),
(8, 'Biro Organisasi dan Sumber Daya Manusia', 1, 1),
(9, 'Biro Hukum', 1, 1),
(10, 'Biro Komunikasi dan Hubungan Masyarakat', 1, 1),
(11, 'Biro Umum dan Pengadaan Barang dan Jasa', 1, 1),
(12, 'Balai Layanan Platform Teknologi', 1, 1),
(13, 'Balai Pengembangan Talenta Indonesia', 1, 1),
(14, 'Sekretariat Inspektorat Jenderal', 1, 5),
(15, 'Inspektorat I', 1, 5),
(16, 'Inspektorat II', 1, 5),
(17, 'Inspektorat III', 1, 5),
(18, 'Inspektorat Investigasi', 1, 5),
(19, 'Sekretariat Badan Standar, Kurikulum, dan Asesmen Pendidikan', 1, 6),
(20, 'Pusat Standar dan Kebijakan Pendidikan', 1, 6);

-- Insert provinsi data
INSERT INTO provinsi (nama_provinsi) VALUES 
('DKI Jakarta'),
('Jawa Barat'),
('Jawa Tengah'),
('Jawa Timur'),
('D.I. Yogyakarta'),
('Bali'),
('Sumatera Utara'),
('Sumatera Barat'),
('Sumatera Selatan'),
('Kalimantan Barat'),
('Kalimantan Timur'),
('Sulawesi Selatan'),
('Papua');

-- Insert bahasa programming data
INSERT INTO bahasa (nama_bahasa) VALUES 
('PHP'),
('JavaScript'),
('Python'),
('Java'),
('C#'),
('.NET'),
('Node.js'),
('React'),
('Vue.js'),
('Angular');

-- Insert framework data
INSERT INTO framework (nama_framework) VALUES 
('Laravel'),
('CodeIgniter'),
('Express.js'),
('Next.js'),
('React'),
('Vue.js'),
('Angular'),
('Spring Boot'),
('ASP.NET'),
('Django');

-- Insert metode pengembangan data
INSERT INTO metode_pengembangan (nama_metode) VALUES 
('Waterfall'),
('Agile'),
('Scrum'),
('DevOps'),
('Kanban'),
('Hybrid');

-- Insert database types
INSERT INTO database_type (nama_database) VALUES 
('MySQL'),
('PostgreSQL'),
('SQL Server'),
('Oracle'),
('MongoDB'),
('MariaDB'),
('SQLite'),
('Redis');

-- Insert pengguna layanan data
INSERT INTO pengguna_layanan (nama_pengguna_layanan) VALUES 
('Internal Kemendikdasmen'),
('Sekolah/Madrasah'),
('Guru dan Tenaga Kependidikan'),
('Siswa'),
('Orang Tua'),
('Masyarakat Umum'),
('Perguruan Tinggi'),
('Pemerintah Daerah');
