import { type NextRequest, NextResponse } from "next/server"
import {
  getApplicationsByRole,
  getUserById,
  type User,
} from "@/lib/database"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

/** ===================== GET: list aplikasi sesuai RBAC ===================== */
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSessionCookie(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const applications = await getApplicationsByRole(user)
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
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (!["super_admin", "admin"].includes(user.role_name)) {
      return NextResponse.json(
        { message: "Access denied. Only super admin and admin can create applications." },
        { status: 403 },
      )
    }

    const body = await request.json()

    // Validasi minimal
    if (!body?.nama_aplikasi) {
      return NextResponse.json({ message: "Nama aplikasi harus diisi" }, { status: 400 })
    }

    // ====== Mapping enum UI -> DB (sesuai konvensi kamu) ======
    const mapSudahBelumToDB = (v?: "Sudah" | "Belum") => (v === "Sudah" ? "Ya" : v === "Belum" ? "Tidak" : undefined)
    const mapBmnToDB = (v?: "Termasuk" | "Tidak Termasuk") => (v === "Termasuk" ? "Ya" : v === "Tidak Termasuk" ? "Tidak" : undefined)

    // Siapkan payload create; kolom opsional biarkan undefined kalau tidak dikirim
    const data: any = {
      url: body.url ?? null,
      nia: body.nia ?? null,
      nama_aplikasi: body.nama_aplikasi,
      singkatan_aplikasi: body.singkatan_aplikasi ?? "",
      deskripsi_aplikasi: body.deskripsi_aplikasi ?? null,
      output_aplikasi: body.output_aplikasi ?? null,
      domain_kementerian: body.domain_kementerian ?? null,

      sudah_pse: mapSudahBelumToDB(body.sudah_pse),
      nomor_pse: body.nomor_pse ?? null,
      termasuk_bmn: mapBmnToDB(body.termasuk_bmn),
      nomor_bmn: body.nomor_bmn ?? null,

      // kolom kondisi_aplikasi di DB diasumsikan string/enum yang sudah match schema
      kondisi_aplikasi: body.kondisi_aplikasi,

      nama_pic_pengelola: body.nama_pic_pengelola ?? "",
      nomor_pic_pengelola: body.nomor_pic_pengelola ?? "",
      email_pengelola: body.email_pengelola ?? "",

      jenis_layanan: body.jenis_layanan,       // 'G2G' | 'G2C' | 'G2B'
      sasaran_layanan: body.sasaran_layanan,   // 'Lokal' | 'Nasional' | 'Internasional'
      user_layanan_id: body.user_layanan_id ?? 1,

      basis_aplikasi: body.basis_aplikasi,     // 'Web' | 'Mobile' | 'Desktop'
      ip_publik: body.ip_publik ?? null,
      tipe_lisensi_aplikasi: body.tipe_lisensi_aplikasi, // 'Open Source' | 'Proprietary'
      model_pengembangan: body.model_pengembangan ?? 0,
      sistem_operasi: body.sistem_operasi ?? 0,
      layanan_infra: body.layanan_infra ?? 0,
      ssl_status: body.ssl_status ?? 0,

      bahasa_id: body.bahasa_id ?? 1,
      framework_id: body.framework_id ?? 1,
      metode_id: body.metode_id ?? 1,
      database_id: body.database_id ?? 1,

      unit_id: body.unit_id ?? null,
      sestama_id: body.sestama_id ?? null,
      provinsi_id: body.provinsi_id ?? null,
      kab_kota_id: body.kab_kota_id ?? null,
    }

    const created = await prisma.applications.create({ data })

    // Ambil lagi lengkap + nama2 untuk konsistensi UI (opsional)
    const detail = await prisma.applications.findUnique({
      where: { application_id: created.application_id },
      include: { unit_kerja: true, sestama: true, provinsi: true },
    })

    return NextResponse.json(
      {
        message: "Aplikasi berhasil ditambahkan",
        application: {
          ...detail,
          // alias untuk kompatibilitas UI lama
          niak: detail?.nia,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("POST /api/applications error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

/** ===================== Helpers ===================== */
async function getUserFromSessionCookie(request: NextRequest): Promise<User | null> {
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

  return await getUserById(userId)
}
