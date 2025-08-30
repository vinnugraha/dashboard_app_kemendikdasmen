-- Insert sample application data

INSERT INTO application (
    url, niak, nama_aplikasi, deskripsi_aplikasi, output_aplikasi,
    nama_pic_pengelola, nomor_pic_pengelola, email_pengelola,
    unit_id, sestama_id, singkatan_aplikasi, kondisi_aplikasi,
    jenis_layanan, sasaran_layanan, pengguna_layanan_id,
    basis_aplikasi, tipe_lisensi_aplikasi, bahasa_id, framework_id,
    metode_id, model_pengembangan, database_id, operation_system,
    layanan_infrastruktur, status_ssl, provinsi_id
) VALUES 
(
    'https://dapodik.kemdikbud.go.id', 'DAPODIK-2024-001',
    'Data Pokok Pendidikan', 
    'Sistem informasi terpadu untuk pengelolaan data pokok pendidikan di Indonesia',
    'Data statistik pendidikan, laporan sekolah, data siswa dan guru',
    'Ahmad Budiman', '081234567890', 'ahmad.budiman@kemdikbud.go.id',
    1, 1, 'DAPODIK', 'Aktif', 'Eksternal', 'Sekolah dan Madrasah se-Indonesia',
    2, 'Web', 'Proprietary', 1, 1, 2, 'Agile', 1, 'Linux Ubuntu 20.04',
    'Cloud Server AWS', 'Active', 1
),
(
    'https://gtk.kemdikbud.go.id', 'GTK-2024-002',
    'Guru dan Tenaga Kependidikan',
    'Portal informasi dan layanan untuk guru dan tenaga kependidikan',
    'Sertifikat profesi, data karir guru, pelatihan online',
    'Siti Nurhaliza', '081234567891', 'siti.nurhaliza@kemdikbud.go.id',
    2, 2, 'GTK', 'Aktif', 'Eksternal', 'Guru dan Tenaga Kependidikan',
    3, 'Web', 'Proprietary', 2, 4, 2, 'Agile', 1, 'Linux CentOS 8',
    'Cloud Server Google Cloud', 'Active', 1
),
(
    'https://pmp.kemdikbud.go.id', 'PMP-2024-003',
    'Penjaminan Mutu Pendidikan',
    'Sistem monitoring dan evaluasi mutu pendidikan',
    'Laporan mutu sekolah, rekomendasi perbaikan, data akreditasi',
    'Budi Santoso', '081234567892', 'budi.santoso@kemdikbud.go.id',
    19, 6, 'PMP', 'Aktif', 'Internal', 'Unit Penjaminan Mutu',
    1, 'Web', 'Proprietary', 1, 1, 2, 'Waterfall', 1, 'Windows Server 2019',
    'On-Premise Server', 'Active', 1
),
(
    'https://sispena.kemdikbud.go.id', 'SISPENA-2024-004',
    'Sistem Penilaian Akreditasi',
    'Platform digital untuk proses akreditasi sekolah dan perguruan tinggi',
    'Sertifikat akreditasi, laporan visitasi, database institusi terakreditasi',
    'Dewi Kartika', '081234567893', 'dewi.kartika@kemdikbud.go.id',
    20, 6, 'SISPENA', 'Aktif', 'Eksternal', 'Sekolah dan Perguruan Tinggi',
    7, 'Web', 'Proprietary', 3, 10, 3, 'Agile', 2, 'Linux Ubuntu 22.04',
    'Hybrid Cloud', 'Active', 2
),
(
    'https://simpkb.kemdikbud.go.id', 'SIMPKB-2024-005',
    'Sistem Informasi Manajemen Pengembangan Keprofesian Berkelanjutan',
    'Platform untuk mengelola program pengembangan profesi guru',
    'Sertifikat pelatihan, portofolio guru, rencana pengembangan karir',
    'Eko Prasetyo', '081234567894', 'eko.prasetyo@kemdikbud.go.id',
    2, 2, 'SIMPKB', 'Aktif', 'Eksternal', 'Guru Seluruh Indonesia',
    3, 'Web', 'Open Source', 1, 1, 2, 'DevOps', 1, 'Linux Debian 11',
    'Kubernetes Cluster', 'Active', 3
),
(
    'https://rapor.kemdikbud.go.id', 'RAPOR-2024-006',
    'Rapor Pendidikan Indonesia',
    'Dashboard nasional untuk monitoring capaian pendidikan',
    'Indeks pendidikan daerah, analisis kesenjangan, rekomendasi kebijakan',
    'Fitri Handayani', '081234567895', 'fitri.handayani@kemdikbud.go.id',
    1, 1, 'RAPOR', 'Aktif', 'Internal', 'Pemerintah Pusat dan Daerah',
    8, 'Web', 'Proprietary', 2, 4, 4, 'Agile', 3, 'Linux RHEL 8',
    'Multi-Cloud Architecture', 'Active', 1
),
(
    'https://belajar.kemdikbud.go.id', 'BELAJAR-2024-007',
    'Platform Merdeka Belajar',
    'Portal pembelajaran digital untuk siswa dan guru',
    'Konten pembelajaran interaktif, assessment online, progress tracking',
    'Galih Permana', '081234567896', 'galih.permana@kemdikbud.go.id',
    3, 1, 'BELAJAR', 'Aktif', 'Eksternal', 'Siswa dan Guru',
    4, 'Web', 'Proprietary', 2, 8, 2, 'Agile', 1, 'Linux Ubuntu 20.04',
    'CDN + Cloud Storage', 'Active', 4
),
(
    'https://snpmb.kemdikbud.go.id', 'SNPMB-2024-008',
    'Seleksi Nasional Penerimaan Mahasiswa Baru',
    'Sistem seleksi terpusat untuk penerimaan mahasiswa perguruan tinggi negeri',
    'Hasil seleksi, data pendaftar, alokasi kursi per PTN',
    'Hendra Wijaya', '081234567897', 'hendra.wijaya@kemdikbud.go.id',
    1, 1, 'SNPMB', 'Aktif', 'Eksternal', 'Calon Mahasiswa',
    4, 'Web', 'Proprietary', 4, 9, 2, 'Waterfall', 4, 'Linux CentOS 8',
    'High Availability Cluster', 'Active', 1
);
