// lib/database.ts
import { prisma } from "./prisma"

// ====== Types UI ======
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
export type SudahPse = 'Sudah' | 'Belum'
export type TermasukBmn = 'Termasuk' | 'Tidak Termasuk'
export type TipeLisensi = 'Open Source' | 'Proprietary'
export type StatusAktifUI = 'Aktif' | 'Tidak Aktif'
export type StatusPenggunaanUI = 'digunakan' | 'tidak digunakan'

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

  status_aktif: StatusAktifUI
  status_penggunaan: StatusPenggunaanUI
  keterangan_penggunaan: string | null

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
  niak?: string | null
}

// ====== Mappers ======
const mapYaTidakToSudahBelum = (v?: 'YA' | 'TIDAK' | null): SudahPse =>
  v === 'YA' ? 'Sudah' : 'Belum'

const mapYaTidakToBmn = (v?: 'YA' | 'TIDAK' | null): TermasukBmn =>
  v === 'YA' ? 'Termasuk' : 'Tidak Termasuk'

const mapStatusAktif = (v?: 'AKTIF' | 'TIDAK_AKTIF' | null): StatusAktifUI =>
  v === 'AKTIF' ? 'Aktif' : 'Tidak Aktif'

const mapStatusPenggunaan = (v?: 'DIGUNAKAN' | 'TIDAK_DIGUNAKAN' | null): StatusPenggunaanUI =>
  v === 'DIGUNAKAN' ? 'digunakan' : 'tidak digunakan'

// ====== Auth ======
export async function authenticateUser(username: string, password: string): Promise<User | null> {
  if (password !== 'password123') return null
  const u = await prisma.user.findFirst({
    where: { username },
    include: { role: true, sestama: true, unitKerja: true },
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
    include: { role: true, sestama: true, unitKerja: true },
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

// ====== Mapper dari DB row ke UI ======
function mapApplicationRowToUI(a: any): ApplicationForUI {
  return {
    application_id: a.id,
    url: a.url ?? null,
    nia: a.nia ?? null,
    nama_aplikasi: a.namaAplikasi,
    singkatan_aplikasi: a.singkatanAplikasi ?? null,
    deskripsi_aplikasi: a.deskripsiAplikasi ?? null,
    output_aplikasi: a.outputAplikasi ?? null,
    domain_kementerian: a.domainKementerian ?? null,

    sudah_pse: mapYaTidakToSudahBelum(a.punyaPse),
    nomor_pse: a.nomorPse ? parseInt(a.nomorPse, 10) : null,
    termasuk_bmn: mapYaTidakToBmn(a.termasukBmn),
    nomor_bmn: a.nomorBmn ? parseInt(a.nomorBmn, 10) : null,

    status_aktif: mapStatusAktif(a.statusAktif),
    status_penggunaan: mapStatusPenggunaan(a.statusPenggunaan),
    keterangan_penggunaan: a.keteranganPenggunaan ?? null,

    nama_pic_pengelola: a.namaPengelola ?? null,
    nomor_pic_pengelola: a.nomorHpPengelola ?? null,
    email_pengelola: a.emailPengelola ?? null,

    jenis_layanan: a.jenisLayanan as JenisLayanan,
    sasaran_layanan: a.sasaranLayanan as SasaranLayanan,
    user_layanan_id: a.penggunaLayananId ?? null,

    basis_aplikasi: a.basisAplikasi as BasisAplikasi,
    ip_publik: a.ipPublik ?? null,
    tipe_lisensi_aplikasi: a.tipeLisensi as TipeLisensi,
    model_pengembangan: null,
    sistem_operasi: null,
    layanan_infra: null,
    ssl_status: null,

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

    niak: a.nia ?? null,
  }
}

export async function getApplicationsByRole(user: User): Promise<ApplicationForUI[]> {
  const where: any = {}
  if (user.role_name === 'sestama') where.sestamaId = user.sestama_id
  else if (user.role_name === 'unit_kerja') where.unitId = user.unit_id

  const rows = await prisma.application.findMany({
    where,
    include: { unit: true, sestama: true, provinsi: true },
    orderBy: { id: 'asc' },
  })
  return rows.map(mapApplicationRowToUI)
}

export async function getApplicationById(id: number, user: User): Promise<ApplicationForUI | null> {
  const where: any = { id }
  if (user.role_name === 'sestama') where.sestamaId = user.sestama_id
  if (user.role_name === 'unit_kerja') where.unitId = user.unit_id

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
