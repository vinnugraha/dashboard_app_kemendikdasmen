// lib/database.ts
import { prisma } from "./prisma"

// ====== Types UI (tetap, sesuai file kamu) ======
export interface User {
  user_id: number
  username: string
  role_id: number
  role_name: 'super_admin' | 'admin' | 'sestama' | 'unit_kerja'
  sestama_id?: number
  unit_id?: number
  sestama_name?: string | null
  unit_name?: string | null
}

export type JenisLayanan = 'G2G' | 'G2C' | 'G2B'
export type BasisAplikasi = 'Web' | 'Mobile' | 'Desktop'
export type SasaranLayanan = 'Lokal' | 'Nasional' | 'Internasional'
export type SudahPse = 'Sudah' | 'Belum'               // UI; DB: 'Ya' | 'Tidak'
export type TermasukBmn = 'Termasuk' | 'Tidak Termasuk' // UI; DB: 'Ya' | 'Tidak'
export type TipeLisensi = 'Open Source' | 'Proprietary'
export type KondisiAplikasiUI =
  | 'Aktif dan Digunakan'
  | 'Aktif dan Tidak Digunakan'
  | 'Tidak Aktif dan Digunakan'
  | 'Tidak Aktif dan Tidak Digunakan'

export interface Application {
  application_id: number
  url: string
  nia: string
  nama_aplikasi: string
  singkatan_aplikasi: string
  deskripsi_aplikasi: string | null
  output_aplikasi: string | null
  domain_kementerian: string | null

  sudah_pse: SudahPse
  nomor_pse: number | null
  termasuk_bmn: TermasukBmn
  nomor_bmn: number | null

  kondisi_aplikasi: KondisiAplikasiUI

  nama_pic_pengelola: string
  nomor_pic_pengelola: string
  email_pengelola: string

  jenis_layanan: JenisLayanan
  sasaran_layanan: SasaranLayanan
  user_layanan_id: number

  basis_aplikasi: BasisAplikasi
  ip_publik?: string | null
  tipe_lisensi_aplikasi: TipeLisensi
  model_pengembangan: number
  sistem_operasi: number
  layanan_infra: number
  ssl_status: number

  bahasa_id: number
  framework_id: number
  metode_id: number
  database_id: number

  unit_id: number
  sestama_id: number
  provinsi_id: number
  kab_kota_id: number | null
}

export type ApplicationForUI = Application & {
  unit_nama?: string
  sestama_nama?: string
  provinsi_nama?: string
  niak?: string
}

// ====== Helpers mapping enum UI <-> DB ======
const yaTidakToUI = (v?: string | null): 'Sudah' | 'Belum' | 'Termasuk' | 'Tidak Termasuk' | undefined => {
  if (v == null) return undefined
  if (v === 'Ya') return 'Sudah'     // untuk PSE
  if (v === 'Tidak') return 'Belum'
  return undefined
}
const yaTidakToUI_BMN = (v?: string | null): TermasukBmn | undefined => {
  if (v == null) return undefined
  if (v === 'Ya') return 'Termasuk'
  if (v === 'Tidak') return 'Tidak Termasuk'
  return undefined
}

// Jika nanti kamu butuh arah sebaliknya:
// const uiSudahBelumToDB = (v: SudahPse): 'Ya'|'Tidak' => (v === 'Sudah' ? 'Ya' : 'Tidak')
// const uiBmnToDB = (v: TermasukBmn): 'Ya'|'Tidak' => (v === 'Termasuk' ? 'Ya' : 'Tidak')

// ====== Auth (opsional, tetap sederhana seperti mock kamu) ======
// Jika sudah ada kolom password hashed, ganti implementasi ini.
export async function authenticateUser(username: string, password: string): Promise<User | null> {
  // SKELETON: samakan perilaku lama: "password123" dianggap valid
  if (password !== 'password123') return null

  const u = await prisma.users.findFirst({
    where: { username },
    include: {
      role: true,
      sestama: true,
      unit_kerja: true,
    },
  })
  if (!u) return null

  return {
    user_id: u.user_id,
    username: u.username,
    role_id: u.role_id,
    role_name: (u.role.role_name as User['role_name']),
    sestama_id: u.sestama_id ?? undefined,
    unit_id: u.unit_id ?? undefined,
    sestama_name: u.sestama?.nama_sestama ?? null,
    unit_name: u.unit_kerja?.nama_unit ?? null,
  }
}

// === Ambil user by id dari DB (dipakai route untuk session) ===
export async function getUserById(userId: number): Promise<User | null> {
  const u = await prisma.users.findUnique({
    where: { user_id: userId },
    include: {
      role: true,
      sestama: true,
      unit_kerja: true,
    },
  })
  if (!u) return null

  return {
    user_id: u.user_id,
    username: u.username,
    role_id: u.role_id,
    role_name: (u.role.role_name as User['role_name']),
    sestama_id: u.sestama_id ?? undefined,
    unit_id: u.unit_id ?? undefined,
    sestama_name: u.sestama?.nama_sestama ?? null,
    unit_name: u.unit_kerja?.nama_unit ?? null,
  }
}

// ====== Core: Query aplikasi sesuai Role + Enrichment ======
export async function getApplicationsByRole(user: User): Promise<ApplicationForUI[]> {
  // Filter RBAC
  const where: any = {}
  if (user.role_name === 'sestama') {
    where.sestama_id = user.sestama_id ?? undefined
  } else if (user.role_name === 'unit_kerja') {
    where.unit_id = user.unit_id ?? undefined
  }
  // super_admin/admin: tanpa filter

  const rows = await prisma.applications.findMany({
    where,
    include: {
      unit_kerja: true, // asumsi relasi: applications.unit_id -> unit_kerja.unit_id
      sestama: true,    // applications.sestama_id -> sestama.sestama_id
      provinsi: true,   // applications.provinsi_id -> provinsi.provinsi_id (kalau ada)
    },
    orderBy: { application_id: 'asc' },
  })

  // Map ke bentuk ApplicationForUI + alias 'niak'
  const apps: ApplicationForUI[] = rows.map((a: any) => {
    const sudahPse = yaTidakToUI(a.sudah_pse) as SudahPse | undefined
    const termasukBmn = yaTidakToUI_BMN(a.termasuk_bmn) as TermasukBmn | undefined

    const out: ApplicationForUI = {
      application_id: a.application_id,
      url: a.url,
      nia: a.nia,
      nama_aplikasi: a.nama_aplikasi,
      singkatan_aplikasi: a.singkatan_aplikasi,
      deskripsi_aplikasi: a.deskripsi_aplikasi,
      output_aplikasi: a.output_aplikasi,
      domain_kementerian: a.domain_kementerian,

      sudah_pse: sudahPse ?? 'Belum',
      nomor_pse: a.nomor_pse,
      termasuk_bmn: termasukBmn ?? 'Tidak Termasuk',
      nomor_bmn: a.nomor_bmn,

      kondisi_aplikasi: a.kondisi_aplikasi as KondisiAplikasiUI,

      nama_pic_pengelola: a.nama_pic_pengelola,
      nomor_pic_pengelola: a.nomor_pic_pengelola,
      email_pengelola: a.email_pengelola,

      jenis_layanan: a.jenis_layanan as JenisLayanan,
      sasaran_layanan: a.sasaran_layanan as SasaranLayanan,
      user_layanan_id: a.user_layanan_id,

      basis_aplikasi: a.basis_aplikasi as BasisAplikasi,
      ip_publik: a.ip_publik,
      tipe_lisensi_aplikasi: a.tipe_lisensi_aplikasi as TipeLisensi,
      model_pengembangan: a.model_pengembangan,
      sistem_operasi: a.sistem_operasi,
      layanan_infra: a.layanan_infra,
      ssl_status: a.ssl_status,

      bahasa_id: a.bahasa_id,
      framework_id: a.framework_id,
      metode_id: a.metode_id,
      database_id: a.database_id,

      unit_id: a.unit_id,
      sestama_id: a.sestama_id,
      provinsi_id: a.provinsi_id,
      kab_kota_id: a.kab_kota_id,

      unit_nama: a.unit_kerja?.nama_unit,
      sestama_nama: a.sestama?.nama_sestama,
      provinsi_nama: a.provinsi?.nama_provinsi,
      niak: a.nia, // alias untuk kompatibilitas komponen lama
    }
    return out
  })

  return apps
}

export async function getApplicationById(id: number, user: User): Promise<ApplicationForUI | null> {
  // Terapkan RBAC di query
  const where: any = { application_id: id }
  if (user.role_name === 'sestama') where.sestama_id = user.sestama_id ?? undefined
  if (user.role_name === 'unit_kerja') where.unit_id = user.unit_id ?? undefined

  const a: any = await prisma.applications.findFirst({
    where,
    include: {
      unit_kerja: true,
      sestama: true,
      provinsi: true,
    },
  })
  if (!a) return null

  const sudahPse = yaTidakToUI(a.sudah_pse) as SudahPse | undefined
  const termasukBmn = yaTidakToUI_BMN(a.termasuk_bmn) as TermasukBmn | undefined

  return {
    application_id: a.application_id,
    url: a.url,
    nia: a.nia,
    nama_aplikasi: a.nama_aplikasi,
    singkatan_aplikasi: a.singkatan_aplikasi,
    deskripsi_aplikasi: a.deskripsi_aplikasi,
    output_aplikasi: a.output_aplikasi,
    domain_kementerian: a.domain_kementerian,

    sudah_pse: sudahPse ?? 'Belum',
    nomor_pse: a.nomor_pse,
    termasuk_bmn: termasukBmn ?? 'Tidak Termasuk',
    nomor_bmn: a.nomor_bmn,

    kondisi_aplikasi: a.kondisi_aplikasi as KondisiAplikasiUI,

    nama_pic_pengelola: a.nama_pic_pengelola,
    nomor_pic_pengelola: a.nomor_pic_pengelola,
    email_pengelola: a.email_pengelola,

    jenis_layanan: a.jenis_layanan as JenisLayanan,
    sasaran_layanan: a.sasaran_layanan as SasaranLayanan,
    user_layanan_id: a.user_layanan_id,

    basis_aplikasi: a.basis_aplikasi as BasisAplikasi,
    ip_publik: a.ip_publik,
    tipe_lisensi_aplikasi: a.tipe_lisensi_aplikasi as TipeLisensi,
    model_pengembangan: a.model_pengembangan,
    sistem_operasi: a.sistem_operasi,
    layanan_infra: a.layanan_infra,
    ssl_status: a.ssl_status,

    bahasa_id: a.bahasa_id,
    framework_id: a.framework_id,
    metode_id: a.metode_id,
    database_id: a.database_id,

    unit_id: a.unit_id,
    sestama_id: a.sestama_id,
    provinsi_id: a.provinsi_id,
    kab_kota_id: a.kab_kota_id,

    unit_nama: a.unit_kerja?.nama_unit,
    sestama_nama: a.sestama?.nama_sestama,
    provinsi_nama: a.provinsi?.nama_provinsi,
    niak: a.nia,
  }
}

// (opsional) untuk route DELETE
export async function deleteApplication(applicationId: number, user: User): Promise<boolean> {
  // pastikan user boleh melihat (dan berarti boleh delete jika admin/super_admin diperiksa di route)
  const current = await getApplicationById(applicationId, user)
  if (!current) return false

  await prisma.applications.delete({ where: { application_id: applicationId } })
  return true
}
