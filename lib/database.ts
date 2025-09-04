// lib/database.ts
import { prisma } from "./prisma"

// ====== Types UI (tetap mengikuti file kamu) ======
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
export type SudahPse = 'Sudah' | 'Belum'               // UI
export type TermasukBmn = 'Termasuk' | 'Tidak Termasuk' // UI
export type TipeLisensi = 'Open Source' | 'Proprietary'
export type KondisiAplikasiUI =
  | 'Aktif dan Digunakan'
  | 'Aktif dan Tidak Digunakan'
  | 'Tidak Aktif dan Digunakan'
  | 'Tidak Aktif dan Tidak Digunakan'

export interface Application {
  application_id: number
  url: string | null
  nia: string | null
  nama_aplikasi: string
  singkatan_aplikasi: string | null
  deskripsi_aplikasi: string | null
  output_aplikasi: string | null
  domain_kementerian: string | null

  sudah_pse: SudahPse
  nomor_pse: number | null
  termasuk_bmn: TermasukBmn
  nomor_bmn: number | null

  kondisi_aplikasi: KondisiAplikasiUI

  nama_pic_pengelola: string | null
  nomor_pic_pengelola: string | null
  email_pengelola: string | null

  jenis_layanan: JenisLayanan | null
  sasaran_layanan: SasaranLayanan | null
  user_layanan_id: number | null

  basis_aplikasi: BasisAplikasi | null
  ip_publik?: string | null
  tipe_lisensi_aplikasi: TipeLisensi | null
  model_pengembangan: number | null
  sistem_operasi: number | null
  layanan_infra: number | null
  ssl_status: number | null

  bahasa_id: number | null
  framework_id: number | null
  metode_id: number | null
  database_id: number | null

  unit_id: number
  sestama_id: number | null
  provinsi_id: number | null
  kab_kota_id: number | null
}

export type ApplicationForUI = Application & {
  unit_nama?: string | null
  sestama_nama?: string | null
  provinsi_nama?: string | null
  niak?: string | null // alias untuk komponen lama
}

// ====== MAPPERS: enum DB -> string UI ======
// DB enum YaTidak = 'YA' | 'TIDAK' (di DB tersimpan "Ya"/"Tidak" via @map)
const mapYaTidakToSudahBelum = (v?: 'YA' | 'TIDAK' | null): SudahPse =>
  v === 'YA' ? 'Sudah' : 'Belum'

const mapYaTidakToBmn = (v?: 'YA' | 'TIDAK' | null): TermasukBmn =>
  v === 'YA' ? 'Termasuk' : 'Tidak Termasuk'

// DB enum BasisAplikasi: WEB/DESKTOP/MOBILE
const mapBasisToUI = (v?: 'WEB' | 'DESKTOP' | 'MOBILE' | null): BasisAplikasi | null => {
  if (!v) return null
  if (v === 'WEB') return 'Web'
  if (v === 'DESKTOP') return 'Desktop'
  return 'Mobile'
}

// DB enum JenisLayanan: G2G/G2C/G2B
const mapJenisToUI = (v?: 'G2G' | 'G2C' | 'G2B' | null): JenisLayanan | null => (v ?? null)

// DB enum SasaranLayanan: LOKAL/NASIONAL/INTERNASIONAL
const mapSasaranToUI = (v?: 'LOKAL' | 'NASIONAL' | 'INTERNASIONAL' | null): SasaranLayanan | null => {
  if (!v) return null
  if (v === 'LOKAL') return 'Lokal'
  if (v === 'NASIONAL') return 'Nasional'
  return 'Internasional'
}

// DB enum TipeLisensi: OPEN_SOURCE/PROPRIETARY
const mapLisensiToUI = (v?: 'OPEN_SOURCE' | 'PROPRIETARY' | null): TipeLisensi | null => {
  if (!v) return null
  return v === 'OPEN_SOURCE' ? 'Open Source' : 'Proprietary'
}

// DB enum KondisiAplikasi -> UI string
const mapKondisiToUI = (
  v?: 'AKTIF_DAN_DIGUNAKAN' | 'AKTIF_TIDAK_DIGUNAKAN' | 'TIDAK_AKTIF_AKAN_DIGUNAKAN' | 'TIDAK_AKTIF_TIDAK_DIGUNAKAN' | null
): KondisiAplikasiUI => {
  switch (v) {
    case 'AKTIF_DAN_DIGUNAKAN': return 'Aktif dan Digunakan'
    case 'AKTIF_TIDAK_DIGUNAKAN': return 'Aktif dan Tidak Digunakan'
    case 'TIDAK_AKTIF_AKAN_DIGUNAKAN': return 'Tidak Aktif dan Digunakan' // mendekati label UI kamu
    case 'TIDAK_AKTIF_TIDAK_DIGUNAKAN': return 'Tidak Aktif dan Tidak Digunakan'
    default: return 'Aktif dan Digunakan'
  }
}

// DB enum DomainKementerian -> string UI
const mapDomainToUI = (v?: 'KEMENDIKDASMEN' | 'KEMENDIKBUD' | 'KEMENDIKTISAINTEK' | null): string | null => {
  if (!v) return null
  if (v === 'KEMENDIKDASMEN') return 'Kemendikdasmen'
  if (v === 'KEMENDIKBUD') return 'Kemendikbud'
  return 'Kemendiktisaintek'
}

// Beberapa enum kamu di UI pakai number (model/sistem/infra/ssl).
// Untuk kesederhanaan dashboard (karena list tidak memakai ini), kita isi default 0/null.
// Kalau nanti dibutuhkan, tinggal bikin mapper ke kode numerik yang kamu inginkan.
const toNum = (v: unknown): number | null => (typeof v === 'number' ? v : null)

// ====== AUTH ======
export async function authenticateUser(username: string, password: string): Promise<User | null> {
  // SKELETON AUTH: samakan perilaku lama (password "password123" dianggap valid)
  if (password !== 'password123') return null

  const u = await prisma.user.findFirst({
    where: { username },
    include: {
      role: true,
      sestama: true,
      unitKerja: true,
    },
  })
  if (!u) return null

  return {
    user_id: u.id,
    username: u.username,
    role_id: u.roleId,
    role_name: u.role.name as User['role_name'],
    sestama_id: u.sestamaId ?? undefined,
    unit_id: u.unitKerjaId ?? undefined,
    sestama_name: u.sestama?.nama ?? null,
    unit_name: u.unitKerja?.nama ?? null,
  }
}

export async function getUserById(userId: number): Promise<User | null> {
  const u = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: true,
      sestama: true,
      unitKerja: true,
    },
  })
  if (!u) return null

  return {
    user_id: u.id,
    username: u.username,
    role_id: u.roleId,
    role_name: u.role.name as User['role_name'],
    sestama_id: u.sestamaId ?? undefined,
    unit_id: u.unitKerjaId ?? undefined,
    sestama_name: u.sestama?.nama ?? null,
    unit_name: u.unitKerja?.nama ?? null,
  }
}

// ====== CORE: ambil aplikasi sesuai role + enrich nama-nama + alias niak ======
function mapApplicationRowToUI(a: any): ApplicationForUI {
  // kolom angka yang mungkin string di DB (nomor_pse/nomor_bmn), kita convert semampunya
  const toIntOrNull = (x: unknown): number | null => {
    const n = typeof x === 'string' ? parseInt(x, 10) : (typeof x === 'number' ? x : NaN)
    return Number.isFinite(n) ? n as number : null
  }

  const app: ApplicationForUI = {
    application_id: a.id,
    url: a.url ?? null,
    nia: a.nia ?? null,
    nama_aplikasi: a.namaAplikasi,
    singkatan_aplikasi: a.singkatanAplikasi ?? null,
    deskripsi_aplikasi: a.deskripsiAplikasi ?? null,
    output_aplikasi: a.outputAplikasi ?? null,
    domain_kementerian: mapDomainToUI(a.domainKementerian),

    sudah_pse: mapYaTidakToSudahBelum(a.punyaPse),
    nomor_pse: toIntOrNull(a.nomorPse),
    termasuk_bmn: mapYaTidakToBmn(a.termasukBmn),
    nomor_bmn: toIntOrNull(a.nomorBmn),

    kondisi_aplikasi: mapKondisiToUI(a.kondisiAplikasi),

    nama_pic_pengelola: a.namaPengelola ?? null,
    nomor_pic_pengelola: a.nomorHpPengelola ?? null,
    email_pengelola: a.emailPengelola ?? null,

    jenis_layanan: mapJenisToUI(a.jenisLayanan),
    sasaran_layanan: mapSasaranToUI(a.sasaranLayanan),
    user_layanan_id: a.penggunaLayananId ?? null,

    basis_aplikasi: mapBasisToUI(a.basisAplikasi),
    ip_publik: a.ipPublik ?? null,
    tipe_lisensi_aplikasi: mapLisensiToUI(a.tipeLisensi),
    model_pengembangan: toNum(null),  // belum dipakai di list
    sistem_operasi: toNum(null),      // belum dipakai di list
    layanan_infra: toNum(null),       // belum dipakai di list
    ssl_status: toNum(null),          // belum dipakai di list

    bahasa_id: a.bahasaId ?? null,
    framework_id: a.frameworkId ?? null,
    metode_id: a.metodeId ?? null,
    database_id: a.databaseId ?? null,

    unit_id: a.unitId,
    sestama_id: a.sestamaId ?? null,
    provinsi_id: a.provinsiId ?? null,
    kab_kota_id: a.kabKotaId ?? null,

    unit_nama: a.unit?.nama ?? null,
    sestama_nama: a.sestama?.nama ?? null,
    provinsi_nama: a.provinsi?.nama ?? null,

    niak: a.nia ?? null, // alias untuk kompatibilitas komponen lama
  }

  return app
}

export async function getApplicationsByRole(user: User): Promise<ApplicationForUI[]> {
  const where: any = {}
  if (user.role_name === 'sestama') where.sestamaId = user.sestama_id ?? undefined
  else if (user.role_name === 'unit_kerja') where.unitId = user.unit_id ?? undefined
  // super_admin/admin: tanpa filter

  const rows = await prisma.application.findMany({
    where,
    include: { unit: true, sestama: true, provinsi: true },
    orderBy: { id: 'asc' },
  })

  return rows.map(mapApplicationRowToUI)
}

export async function getApplicationById(id: number, user: User): Promise<ApplicationForUI | null> {
  const where: any = { id }
  if (user.role_name === 'sestama') where.sestamaId = user.sestama_id ?? undefined
  if (user.role_name === 'unit_kerja') where.unitId = user.unit_id ?? undefined

  const a = await prisma.application.findFirst({
    where,
    include: { unit: true, sestama: true, provinsi: true },
  })
  return a ? mapApplicationRowToUI(a) : null
}

export async function deleteApplication(applicationId: number, user: User): Promise<boolean> {
  const current = await getApplicationById(applicationId, user)
  if (!current) return false
  await prisma.application.delete({ where: { id: applicationId } })
  return true
}
