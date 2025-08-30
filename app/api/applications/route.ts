import { type NextRequest, NextResponse } from "next/server"
import { getApplicationsByRole } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    // Get user from session cookie
    const sessionCookie = request.cookies.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

    const mockUsers = [
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

    const user = mockUsers.find((u) => u.user_id === sessionData.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const applications = await getApplicationsByRole(user)

    return NextResponse.json({
      applications,
      total: applications.length,
      user_role: user.role_name,
      access_level: {
        super_admin: user.role_name === "super_admin" ? "Full access to all applications" : null,
        admin: user.role_name === "admin" ? "Full access to all applications" : null,
        sestama: user.role_name === "sestama" ? `Access to ${user.sestama_name} applications only` : null,
        unit_kerja: user.role_name === "unit_kerja" ? `Access to ${user.unit_name} applications only` : null,
      },
    })
  } catch (error) {
    console.error("Applications API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user from session cookie
    const sessionCookie = request.cookies.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

    const mockUsers = [
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

    const user = mockUsers.find((u) => u.user_id === sessionData.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check if user has permission to create applications
    if (!["super_admin", "admin"].includes(user.role_name)) {
      return NextResponse.json(
        { message: "Access denied. Only super admin and admin can create applications." },
        { status: 403 },
      )
    }

    const applicationData = await request.json()

    // Validate required fields
    if (!applicationData.nama_aplikasi) {
      return NextResponse.json({ message: "Nama aplikasi harus diisi" }, { status: 400 })
    }

    // In production, this would insert into the database
    // For now, we'll simulate success
    const newApplication = {
      application_id: Math.floor(Math.random() * 10000) + 1000,
      ...applicationData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("New application created:", newApplication)

    return NextResponse.json(
      {
        message: "Aplikasi berhasil ditambahkan",
        application: newApplication,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create application API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
