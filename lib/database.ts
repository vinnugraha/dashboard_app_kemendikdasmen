// Database connection utility
// This will be configured with actual MySQL credentials

export interface User {
  user_id: number
  username: string
  email: string
  role_id: number
  role_name: string
  sestama_id?: number
  unit_id?: number
  sestama_name?: string
  unit_name?: string
}

export interface Application {
  application_id: number
  url?: string
  niak?: string
  nama_aplikasi: string
  deskripsi_aplikasi?: string
  output_aplikasi?: string
  nama_pic_pengelola?: string
  nomor_pic_pengelola?: string
  email_pengelola?: string
  unit_id?: number
  sestama_id?: number
  singkatan_aplikasi?: string
  kondisi_aplikasi: "Aktif" | "Tidak Aktif" | "Maintenance"
  jenis_layanan: "Internal" | "Eksternal" | "Hybrid"
  sasaran_layanan?: string
  basis_aplikasi: "Web" | "Mobile" | "Desktop" | "Hybrid"
  tipe_lisensi_aplikasi: "Open Source" | "Proprietary" | "Commercial"
  provinsi_nama?: string
  unit_nama?: string
  sestama_nama?: string
  created_at: string
  updated_at: string
}

// Mock database functions for development
// Replace with actual MySQL queries in production

const mockUsers: User[] = [
  {
    user_id: 1,
    username: "superadmin",
    email: "superadmin@kemdikbud.go.id",
    role_id: 1,
    role_name: "super_admin",
    sestama_name: null,
    unit_name: null,
  },
  {
    user_id: 2,
    username: "admin1",
    email: "admin1@kemdikbud.go.id",
    role_id: 2,
    role_name: "admin",
    sestama_name: null,
    unit_name: null,
  },
  {
    user_id: 3,
    username: "sestama_setjen",
    email: "sestama1@kemdikbud.go.id",
    role_id: 3,
    role_name: "sestama",
    sestama_id: 1,
    sestama_name: "Sekretariat Jenderal",
    unit_name: null,
  },
  {
    user_id: 4,
    username: "sestama_gtk",
    email: "sestama2@kemdikbud.go.id",
    role_id: 3,
    role_name: "sestama",
    sestama_id: 2,
    sestama_name: "Direktorat Jenderal Guru, Tenaga Kependidikan, dan Pendidikan Guru",
    unit_name: null,
  },
  {
    user_id: 5,
    username: "pusdatin",
    email: "pusdatin@kemdikbud.go.id",
    role_id: 4,
    role_name: "unit_kerja",
    sestama_id: 1,
    unit_id: 1,
    sestama_name: "Sekretariat Jenderal",
    unit_name: "Pusat Data dan Teknologi Informasi",
  },
  {
    user_id: 6,
    username: "puslatsdm",
    email: "puslatsdm@kemdikbud.go.id",
    role_id: 4,
    role_name: "unit_kerja",
    sestama_id: 1,
    unit_id: 2,
    sestama_name: "Sekretariat Jenderal",
    unit_name: "Pusat Pelatihan Sumber Daya Manusia",
  },
  {
    user_id: 7,
    username: "dirppg",
    email: "dirppg@kemdikbud.go.id",
    role_id: 4,
    role_name: "unit_kerja",
    sestama_id: 2,
    unit_id: 60,
    sestama_name: "Direktorat Jenderal Guru, Tenaga Kependidikan, dan Pendidikan Guru",
    unit_name: "Direktorat Pendidikan Profesi Guru",
  },
]

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  // Mock authentication - replace with actual database query
  // In production: SELECT users.*, role.role_name, sestama.nama_sestama, unit_kerja.nama_unit
  // FROM users JOIN role ON users.role_id = role.role_id ...

  if (password !== "password123") {
    return null
  }

  const user = mockUsers.find((u) => u.username === username || u.email === username)
  return user || null
}

export async function getApplicationsByRole(user: User): Promise<Application[]> {
  // Mock applications - replace with actual database query based on user role
  const mockApplications: Application[] = [
    {
      application_id: 1,
      url: "https://dapodik.kemdikbud.go.id",
      niak: "DAPODIK-2024-001",
      nama_aplikasi: "Data Pokok Pendidikan",
      deskripsi_aplikasi:
        "Sistem informasi terpadu untuk pengelolaan data pokok pendidikan di Indonesia yang mencakup data sekolah, siswa, guru, dan tenaga kependidikan. Platform ini menjadi sumber data utama untuk perencanaan dan evaluasi kebijakan pendidikan nasional.",
      output_aplikasi:
        "Data statistik pendidikan, laporan sekolah, data siswa dan guru, analisis tren pendidikan, dashboard monitoring real-time",
      nama_pic_pengelola: "Ahmad Budiman",
      nomor_pic_pengelola: "081234567890",
      email_pengelola: "ahmad.budiman@kemdikbud.go.id",
      unit_id: 1,
      sestama_id: 1,
      singkatan_aplikasi: "DAPODIK",
      kondisi_aplikasi: "Aktif",
      jenis_layanan: "Eksternal",
      sasaran_layanan: "Sekolah dan Madrasah se-Indonesia, Dinas Pendidikan Daerah",
      basis_aplikasi: "Web",
      tipe_lisensi_aplikasi: "Proprietary",
      provinsi_nama: "DKI Jakarta",
      unit_nama: "Pusat Data dan Teknologi Informasi",
      sestama_nama: "Sekretariat Jenderal",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    },
    {
      application_id: 2,
      url: "https://gtk.kemdikbud.go.id",
      niak: "GTK-2024-002",
      nama_aplikasi: "Guru dan Tenaga Kependidikan",
      deskripsi_aplikasi:
        "Portal informasi dan layanan komprehensif untuk guru dan tenaga kependidikan yang menyediakan berbagai fitur pengembangan profesional, sertifikasi, dan manajemen karir.",
      output_aplikasi: "Sertifikat profesi, data karir guru, pelatihan online, portofolio digital, evaluasi kinerja",
      nama_pic_pengelola: "Siti Nurhaliza",
      nomor_pic_pengelola: "081234567891",
      email_pengelola: "siti.nurhaliza@kemdikbud.go.id",
      unit_id: 60,
      sestama_id: 2,
      singkatan_aplikasi: "GTK",
      kondisi_aplikasi: "Aktif",
      jenis_layanan: "Eksternal",
      sasaran_layanan: "Guru dan Tenaga Kependidikan seluruh Indonesia",
      basis_aplikasi: "Web",
      tipe_lisensi_aplikasi: "Proprietary",
      provinsi_nama: "DKI Jakarta",
      unit_nama: "Direktorat Pendidikan Profesi Guru",
      sestama_nama: "Direktorat Jenderal Guru, Tenaga Kependidikan, dan Pendidikan Guru",
      created_at: "2024-01-16T10:00:00Z",
      updated_at: "2024-01-16T10:00:00Z",
    },
    {
      application_id: 3,
      url: "https://puslatsdm.kemdikbud.go.id",
      niak: "PUSLATSDM-2024-003",
      nama_aplikasi: "Sistem Pelatihan SDM",
      deskripsi_aplikasi:
        "Platform pelatihan dan pengembangan sumber daya manusia internal Kemendikdasmen dengan fokus pada peningkatan kompetensi pegawai melalui berbagai program pelatihan terstruktur.",
      output_aplikasi: "Sertifikat pelatihan, modul pembelajaran, evaluasi kompetensi, laporan progress pelatihan",
      nama_pic_pengelola: "Budi Santoso",
      nomor_pic_pengelola: "081234567892",
      email_pengelola: "budi.santoso@kemdikbud.go.id",
      unit_id: 2,
      sestama_id: 1,
      singkatan_aplikasi: "PUSLATSDM",
      kondisi_aplikasi: "Aktif",
      jenis_layanan: "Internal",
      sasaran_layanan: "Pegawai Kemendikdasmen dan Unit Kerja Terkait",
      basis_aplikasi: "Web",
      tipe_lisensi_aplikasi: "Proprietary",
      provinsi_nama: "DKI Jakarta",
      unit_nama: "Pusat Pelatihan Sumber Daya Manusia",
      sestama_nama: "Sekretariat Jenderal",
      created_at: "2024-01-17T10:00:00Z",
      updated_at: "2024-01-17T10:00:00Z",
    },
    {
      application_id: 4,
      url: "https://pmp.kemdikbud.go.id",
      niak: "PMP-2024-004",
      nama_aplikasi: "Penjaminan Mutu Pendidikan",
      deskripsi_aplikasi:
        "Sistem monitoring dan evaluasi mutu pendidikan yang komprehensif untuk memastikan standar kualitas pendidikan di seluruh Indonesia melalui berbagai indikator dan metrik kinerja.",
      output_aplikasi: "Laporan mutu sekolah, rekomendasi perbaikan, data akreditasi, analisis gap mutu",
      nama_pic_pengelola: "Dewi Kartika",
      nomor_pic_pengelola: "081234567893",
      email_pengelola: "dewi.kartika@kemdikbud.go.id",
      unit_id: 19,
      sestama_id: 6,
      singkatan_aplikasi: "PMP",
      kondisi_aplikasi: "Maintenance",
      jenis_layanan: "Internal",
      sasaran_layanan: "Unit Penjaminan Mutu, Sekolah, Dinas Pendidikan",
      basis_aplikasi: "Web",
      tipe_lisensi_aplikasi: "Proprietary",
      provinsi_nama: "DKI Jakarta",
      unit_nama: "Sekretariat Badan Standar, Kurikulum, dan Asesmen Pendidikan",
      sestama_nama: "Badan Standar, Kurikulum, dan Asesmen Pendidikan",
      created_at: "2024-01-18T10:00:00Z",
      updated_at: "2024-01-18T10:00:00Z",
    },
    {
      application_id: 5,
      url: "https://sispena.kemdikbud.go.id",
      niak: "SISPENA-2024-005",
      nama_aplikasi: "Sistem Penilaian Akreditasi",
      deskripsi_aplikasi:
        "Platform digital untuk proses akreditasi sekolah dan perguruan tinggi yang mengotomatisasi proses evaluasi, visitasi, dan penerbitan sertifikat akreditasi.",
      output_aplikasi:
        "Sertifikat akreditasi, laporan visitasi, database institusi terakreditasi, analisis kualitas institusi",
      nama_pic_pengelola: "Eko Prasetyo",
      nomor_pic_pengelola: "081234567894",
      email_pengelola: "eko.prasetyo@kemdikbud.go.id",
      unit_id: 20,
      sestama_id: 6,
      singkatan_aplikasi: "SISPENA",
      kondisi_aplikasi: "Aktif",
      jenis_layanan: "Eksternal",
      sasaran_layanan: "Sekolah dan Perguruan Tinggi, Asesor Akreditasi",
      basis_aplikasi: "Web",
      tipe_lisensi_aplikasi: "Proprietary",
      provinsi_nama: "Jawa Barat",
      unit_nama: "Pusat Standar dan Kebijakan Pendidikan",
      sestama_nama: "Badan Standar, Kurikulum, dan Asesmen Pendidikan",
      created_at: "2024-01-19T10:00:00Z",
      updated_at: "2024-01-19T10:00:00Z",
    },
    {
      application_id: 6,
      url: "https://simpkb.kemdikbud.go.id",
      niak: "SIMPKB-2024-006",
      nama_aplikasi: "Sistem Informasi Manajemen Pengembangan Keprofesian Berkelanjutan",
      deskripsi_aplikasi:
        "Platform untuk mengelola program pengembangan profesi guru secara berkelanjutan dengan fitur tracking progress, sertifikasi, dan pengembangan karir yang terintegrasi.",
      output_aplikasi:
        "Sertifikat pelatihan, portofolio guru, rencana pengembangan karir, evaluasi kompetensi berkelanjutan",
      nama_pic_pengelola: "Fitri Handayani",
      nomor_pic_pengelola: "081234567895",
      email_pengelola: "fitri.handayani@kemdikbud.go.id",
      unit_id: 63,
      sestama_id: 2,
      singkatan_aplikasi: "SIMPKB",
      kondisi_aplikasi: "Aktif",
      jenis_layanan: "Eksternal",
      sasaran_layanan: "Guru Seluruh Indonesia, LPTK, Dinas Pendidikan",
      basis_aplikasi: "Web",
      tipe_lisensi_aplikasi: "Open Source",
      provinsi_nama: "Jawa Tengah",
      unit_nama: "Direktorat Guru Pendidikan Dasar",
      sestama_nama: "Direktorat Jenderal Guru, Tenaga Kependidikan, dan Pendidikan Guru",
      created_at: "2024-01-20T10:00:00Z",
      updated_at: "2024-01-20T10:00:00Z",
    },
    {
      application_id: 7,
      url: "https://inspektorat.kemdikbud.go.id",
      niak: "ITJEN-2024-007",
      nama_aplikasi: "Sistem Pengawasan Internal",
      deskripsi_aplikasi:
        "Platform untuk monitoring dan pengawasan internal kementerian yang mencakup audit kinerja, compliance monitoring, dan sistem pelaporan terintegrasi.",
      output_aplikasi: "Laporan audit, temuan pengawasan, rekomendasi perbaikan, dashboard monitoring compliance",
      nama_pic_pengelola: "Galih Permana",
      nomor_pic_pengelola: "081234567896",
      email_pengelola: "galih.permana@kemdikbud.go.id",
      unit_id: 14,
      sestama_id: 5,
      singkatan_aplikasi: "SPI",
      kondisi_aplikasi: "Aktif",
      jenis_layanan: "Internal",
      sasaran_layanan: "Unit Kerja Internal Kemendikdasmen, Auditor Internal",
      basis_aplikasi: "Web",
      tipe_lisensi_aplikasi: "Proprietary",
      provinsi_nama: "DKI Jakarta",
      unit_nama: "Sekretariat Inspektorat Jenderal",
      sestama_nama: "Inspektorat Jenderal",
      created_at: "2024-01-21T10:00:00Z",
      updated_at: "2024-01-21T10:00:00Z",
    },
    {
      application_id: 8,
      url: "https://bahasa.kemdikbud.go.id",
      niak: "BAHASA-2024-008",
      nama_aplikasi: "Portal Bahasa Indonesia",
      deskripsi_aplikasi:
        "Platform pengembangan dan pembinaan bahasa Indonesia yang menyediakan berbagai sumber daya pembelajaran, kamus digital, dan panduan penggunaan bahasa yang baik dan benar.",
      output_aplikasi: "Kamus digital, panduan bahasa, materi pembelajaran, artikel kebahasaan, tools penerjemahan",
      nama_pic_pengelola: "Hendra Wijaya",
      nomor_pic_pengelola: "081234567897",
      email_pengelola: "hendra.wijaya@kemdikbud.go.id",
      unit_id: 25,
      sestama_id: 7,
      singkatan_aplikasi: "BAHASA",
      kondisi_aplikasi: "Tidak Aktif",
      jenis_layanan: "Eksternal",
      sasaran_layanan: "Masyarakat Umum, Pelajar, Guru Bahasa Indonesia",
      basis_aplikasi: "Web",
      tipe_lisensi_aplikasi: "Open Source",
      provinsi_nama: "DKI Jakarta",
      unit_nama: "Sekretariat Badan Pengembangan dan Pembinaan Bahasa",
      sestama_nama: "Badan Pengembangan dan Pembinaan Bahasa",
      created_at: "2024-01-22T10:00:00Z",
      updated_at: "2024-01-22T10:00:00Z",
    },
  ]

  switch (user.role_name) {
    case "super_admin":
      // Super admin can see all applications
      return mockApplications

    case "admin":
      // Admin can see all applications (same as super admin for viewing)
      return mockApplications

    case "sestama":
      // Sestama can only see applications from units under their sestama
      if (!user.sestama_id) {
        console.warn("Sestama user missing sestama_id:", user)
        return []
      }
      return mockApplications.filter((app) => app.sestama_id === user.sestama_id)

    case "unit_kerja":
      // Unit kerja can only see applications from their own unit
      if (!user.unit_id) {
        console.warn("Unit kerja user missing unit_id:", user)
        return []
      }
      return mockApplications.filter((app) => app.unit_id === user.unit_id)

    default:
      console.warn("Unknown role:", user.role_name)
      return []
  }
}

export async function getApplicationById(id: number, user: User): Promise<Application | null> {
  const applications = await getApplicationsByRole(user)
  return applications.find((app) => app.application_id === id) || null
}
