import { NextResponse, type NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

/** ===================== Helpers ===================== */

// Bentuk user yang dipakai RBAC di route ini
type SessionUser = {
  id: number
  role_name: "super_admin" | "admin" | "sestama" | "unit_kerja" | string
  unit_id: number | null
  unit_name: string | null
  sestama_id: number | null
  sestama_name: string | null
}

// Decode cookie session (base64 / base64url) dan load user dari DB
async function getUserFromSessionCookie(request: NextRequest): Promise<SessionUser | null> {
  const c = request.cookies.get("session")
  if (!c) return null

  let decoded: any
  try {
    decoded = JSON.parse(Buffer.from(c.value, "base64").toString("utf8"))
  } catch {
    try {
      decoded = JSON.parse(Buffer.from(c.value, "base64url").toString("utf8"))
    } catch {
      return null
    }
  }

  const userId = Number(decoded?.userId)
  if (!userId || Number.isNaN(userId)) return null

  const u = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: true,
      unitKerja: {
        include: { sestama: true },
      },
      sestama: true,
    },
  })
  if (!u) return null

  // Mapping nama role → role_name yang kamu pakai di UI/session
  // Sesuaikan kalau di tabel role kamu nilainya sudah "super_admin", "admin", dll.
  const rn = (u.role.name || "").toLowerCase()
  const role_name =
    rn === "super_admin" || rn === "super admin"
      ? "super_admin"
      : rn === "admin"
      ? "admin"
      : rn === "sestama"
      ? "sestama"
      : rn === "unit_kerja" || rn === "unit kerja"
      ? "unit_kerja"
      : rn

  return {
    id: u.id,
    role_name: role_name as SessionUser["role_name"],
    unit_id: u.unitKerjaId ?? null,
    unit_name: u.unitKerja?.nama ?? null,
    sestama_id: u.sestamaId ?? u.unitKerja?.sestamaId ?? null,
    sestama_name: u.sestama?.nama ?? u.unitKerja?.sestama?.nama ?? null,
  }
}

// Derive status_aktif dari enum kondisi_aplikasi
function deriveStatusAktif(kondisi?: string | null): "Aktif" | "Tidak Aktif" {
  if (!kondisi) return "Tidak Aktif"
  // Enum kamu: "Aktif dan Digunakan", "Aktif dan Tidak Digunakan", dst.
  return kondisi.startsWith("Aktif") ? "Aktif" : "Tidak Aktif"
}

// Map enum label UI → enum key Prisma (jaga-jaga terima label)
function toEnumKey<T extends string>(value: any, mapping: Record<string, T>): T | undefined {
  if (!value) return undefined as any
  const v = String(value)
  if (v in mapping) return mapping[v] // sudah key
  // cari by label (value dari @map)
  const hit = Object.entries(mapping).find(([k, lbl]) => lbl === v)
  return hit ? (hit[0] as T) : (undefined as any)
}

// Mapping untuk beberapa enum yang mungkin dikirim UI
const YaTidakMap = { YA: "Ya", TIDAK: "Tidak" } as const
const JenisLayananMap = { G2G: "G2G", G2C: "G2C", G2B: "G2B" } as const
const SasaranLayananMap = { LOKAL: "Lokal", NASIONAL: "Nasional", INTERNASIONAL: "Internasional" } as const
const BasisAplikasiMap = { WEB: "Web", DESKTOP: "Desktop", MOBILE: "Mobile" } as const
const TipeLisensiMap = { OPEN_SOURCE: "Open Source", PROPRIETARY: "Proprietary" } as const
const ModelPengembanganMap = { MICROSERVICES: "Microservices", MONOLITHIC: "Monolytic" } as const
const SistemOperasiMap = { WINDOWS: "Windows", LINUX: "Linux" } as const
const LayananInfraMap = {
  PDNS: "PDNS",
  KOMPUTASI_AWAN_PUSDATIN: "Komputasi Awan Pusdatin",
  PUBLIC_CLOUD_PUSDATIN: "Public Cloud Pusdatin",
  PUBLIC_CLOUD_MANDIRI: "Public Cloud Mandiri",
  HOSTING: "Hosting",
  COLOCATION_PUSDATIN_CIPUTAT: "Co-location Pusdatin Ciputat",
  COLOCATION_PUSDATIN_SENAYAN: "Co-location Pusdatin Senayan",
  COLOCATION_PUSDATIN_IDC: "Co-location Pusdatin IDC",
  COLOCATION_MANDIRI: "Co-location Mandiri",
  RUANG_SERVER_MANDIRI: "Ruang Server Mandiri",
} as const

/** ===================== GET: list aplikasi sesuai RBAC ===================== */
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSessionCookie(request)
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    // RBAC filter
    let where: any = {}
    if (user.role_name === "sestama" && user.sestama_id) {
      where = {
        OR: [{ sestamaId: user.sestama_id }, { unit: { sestamaId: user.sestama_id } }],
      }
    } else if (user.role_name === "unit_kerja" && user.unit_id) {
      where = { unitId: user.unit_id }
    } // admin/super_admin: tanpa filter

    const rows = await prisma.application.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: {
        unit: { include: { sestama: true } },
        sestama: true,
        provinsi: true,
      },
    })

    // Map ke shape yang dipakai UI dashboard
    const applications = rows.map((r) => {
      const kondisi = r.kondisi_aplikasi ? r.kondisi_aplikasi.replaceAll("_", " ") : null
      const status_aktif = deriveStatusAktif(kondisi)
      return {
        application_id: r.id,
        url: r.url,
        niak: r.nia ?? null,
        nama_aplikasi: r.namaAplikasi,
        unit_nama: r.unit?.nama ?? null,
        sestama_nama: r.sestama?.nama ?? r.unit?.sestama?.nama ?? null,
        provinsi_nama: r.provinsi?.nama ?? null,
        status_aktif,
        status_penggunaan: kondisi, // tampilkan enum kondisi sebagai status penggunaan
        keterangan_penggunaan: r.deskripsiAplikasi ?? null,
        layanan_infra: r.layananInfra ?? null,
        layanan_infra_label: r.layananInfra ? LayananInfraMap[r.layananInfra] : null,
        updated_at: r.updatedAt,
      }
    })

    return NextResponse.json({
      applications,
      total: applications.length,
      user_role: user.role_name,
      access_level: {
        super_admin: user.role_name === "super_admin" ? "Full access to all applications" : null,
        admin: user.role_name === "admin" ? "Full access to all applications" : null,
        sestama: user.role_name === "sestama" ? `Access to ${user.sestama_name ?? "-"} applications only` : null,
        unit_kerja: user.role_name === "unit_kerja" ? `Access to ${user.unit_name ?? "-"} applications only` : null,
      },
    })
  } catch (error) {
    console.error("GET /api/applications error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

/** ===================== POST: tambah aplikasi (admin only) ===================== */
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSessionCookie(request)
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    if (!["super_admin", "admin"].includes(user.role_name))
      return NextResponse.json({ message: "Access denied" }, { status: 403 })

    const body = await request.json()

    if (!body?.nama_aplikasi) {
      return NextResponse.json({ message: "Nama aplikasi harus diisi" }, { status: 400 })
    }

    // Map payload UI (snake_case) → field Prisma (camelCase)
    const data: any = {
      url: body.url ?? null,
      nia: body.nia ?? null,
      namaAplikasi: body.nama_aplikasi,
      singkatanAplikasi: body.singkatan_aplikasi ?? null,
      deskripsiAplikasi: body.deskripsi_aplikasi ?? null,
      outputAplikasi: body.output_aplikasi ?? null,
      // enum (gunakan key; helper menerima key atau label)
      punyaPse: toEnumKey(body.sudah_pse, YaTidakMap),
      nomorPse: body.nomor_pse ?? null,
      termasukBmn: toEnumKey(body.termasuk_bmn, YaTidakMap),
      nomorBmn: body.nomor_bmn ?? null,
      kondisi_aplikasi: body.kondisi_aplikasi ?? null, // pastikan kirim salah satu enum yang valid
      namaPengelola: body.nama_pic_pengelola ?? null,
      nomorHpPengelola: body.nomor_pic_pengelola ?? null,
      emailPengelola: body.email_pengelola ?? null,
      jenisLayanan: toEnumKey(body.jenis_layanan, JenisLayananMap),
      sasaranLayanan: toEnumKey(body.sasaran_layanan, SasaranLayananMap),
      basisAplikasi: toEnumKey(body.basis_aplikasi, BasisAplikasiMap),
      ipPublik: body.ip_publik ?? null,
      tipeLisensi: toEnumKey(body.tipe_lisensi_aplikasi, TipeLisensiMap),
      modelPengembangan: toEnumKey(body.model_pengembangan, ModelPengembanganMap),
      sistemOperasi: toEnumKey(body.sistem_operasi, SistemOperasiMap),
      layananInfra: toEnumKey(body.layanan_infra, LayananInfraMap),
      // relasi (id)
      bahasaId: body.bahasa_id ?? null,
      frameworkId: body.framework_id ?? null,
      metodeId: body.metode_id ?? null,
      databaseId: body.database_id ?? null,
      penggunaLayananId: body.user_layanan_id ?? null,
      unitId: body.unit_id ?? null,
      sestamaId: body.sestama_id ?? null,
      provinsiId: body.provinsi_id ?? null,
      kabKotaId: body.kab_kota_id ?? null,
    }

    const created = await prisma.application.create({ data, include: { unit: { include: { sestama: true } }, sestama: true, provinsi: true } })

    const aplikasi = {
      application_id: created.id,
      url: created.url,
      niak: created.nia ?? null,
      nama_aplikasi: created.namaAplikasi,
      unit_nama: created.unit?.nama ?? null,
      sestama_nama: created.sestama?.nama ?? created.unit?.sestama?.nama ?? null,
      provinsi_nama: created.provinsi?.nama ?? null,
      status_aktif: deriveStatusAktif(created.kondisi_aplikasi?.replaceAll("_", " ")),
      status_penggunaan: created.kondisi_aplikasi?.replaceAll("_", " "),
      keterangan_penggunaan: created.deskripsiAplikasi ?? null,
      layanan_infra: created.layananInfra ?? null,
      layanan_infra_label: created.layananInfra ? LayananInfraMap[created.layananInfra] : null,
      updated_at: created.updatedAt,
    }

    return NextResponse.json({ message: "Aplikasi berhasil ditambahkan", application: aplikasi }, { status: 201 })
  } catch (error) {
    console.error("POST /api/applications error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
