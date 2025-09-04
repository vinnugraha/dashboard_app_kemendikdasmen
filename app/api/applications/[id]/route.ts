import { type NextRequest, NextResponse } from "next/server"
import {
  getApplicationById,
  getUserById,
  deleteApplication,
  type User,
} from "@/lib/database"

export const runtime = "nodejs"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const applicationId = Number.parseInt(params.id)
    if (Number.isNaN(applicationId)) {
      return NextResponse.json({ message: "Invalid application ID" }, { status: 400 })
    }

    const user = await getUserFromSessionCookie(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const application = await getApplicationById(applicationId, user)
    if (!application) {
      return NextResponse.json({ message: "Application not found or access denied" }, { status: 404 })
    }

    return NextResponse.json({ application, user_role: user.role_name })
  } catch (error) {
    console.error("Application detail API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const applicationId = Number.parseInt(params.id)
    if (Number.isNaN(applicationId)) {
      return NextResponse.json({ message: "Invalid application ID" }, { status: 400 })
    }

    const user = await getUserFromSessionCookie(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (!["super_admin", "admin"].includes(user.role_name)) {
      return NextResponse.json(
        { message: "Access denied. Only super admin and admin can delete applications." },
        { status: 403 },
      )
    }

    const ok = await deleteApplication(applicationId, user)
    if (!ok) {
      return NextResponse.json({ message: "Failed to delete application or application not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Aplikasi berhasil dihapus", application_id: applicationId })
  } catch (error) {
    console.error("Delete application API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ===== Helpers =====
async function getUserFromSessionCookie(request: NextRequest): Promise<User | null> {
  const sessionCookie = request.cookies.get("session")
  if (!sessionCookie) return null

  // dukung base64 & base64url
  let decoded: any
  try {
    decoded = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString("utf8"))
  } catch {
    try {
      decoded = JSON.parse(Buffer.from(sessionCookie.value, "base64url").toString("utf8"))
    } catch {
      return null
    }
  }

  const userId = Number(decoded?.userId)
  if (!userId || Number.isNaN(userId)) return null

  return await getUserById(userId)
}
