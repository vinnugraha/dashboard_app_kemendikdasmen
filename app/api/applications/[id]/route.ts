import { type NextRequest, NextResponse } from "next/server"
import { getApplicationById } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const applicationId = Number.parseInt(params.id)

    if (isNaN(applicationId)) {
      return NextResponse.json({ message: "Invalid application ID" }, { status: 400 })
    }

    // Get user from session cookie
    const sessionCookie = request.cookies.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

    // Mock user data - same as in applications route
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

    // Get application with role-based access control
    const application = await getApplicationById(applicationId, user)

    if (!application) {
      return NextResponse.json({ message: "Application not found or access denied" }, { status: 404 })
    }

    return NextResponse.json({
      application,
      user_role: user.role_name,
    })
  } catch (error) {
    console.error("Application detail API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const applicationId = Number.parseInt(params.id)

    if (isNaN(applicationId)) {
      return NextResponse.json({ message: "Invalid application ID" }, { status: 400 })
    }

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

    // Check if user has permission to delete applications
    if (!["super_admin", "admin"].includes(user.role_name)) {
      return NextResponse.json(
        { message: "Access denied. Only super admin and admin can delete applications." },
        { status: 403 },
      )
    }

    // In production, this would delete from the database
    // For now, we'll simulate success
    console.log(`Application ${applicationId} deleted by user ${user.username}`)

    return NextResponse.json({
      message: "Aplikasi berhasil dihapus",
      application_id: applicationId,
    })
  } catch (error) {
    console.error("Delete application API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
