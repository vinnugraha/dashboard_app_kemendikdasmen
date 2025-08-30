import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: "Username dan password harus diisi" }, { status: 400 })
    }

    const user = await authenticateUser(username, password)

    if (!user) {
      return NextResponse.json({ message: "Username atau password salah" }, { status: 401 })
    }

    // Create session token (in production, use proper JWT or session management)
    const sessionToken = Buffer.from(
      JSON.stringify({
        userId: user.user_id,
        timestamp: Date.now(),
      }),
    ).toString("base64")

    const response = NextResponse.json({
      message: "Login berhasil",
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        role_name: user.role_name,
        sestama_id: user.sestama_id,
        unit_id: user.unit_id,
        sestama_name: user.sestama_name,
        unit_name: user.unit_name,
      },
    })

    // Set session cookie
    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Terjadi kesalahan sistem" }, { status: 500 })
  }
}
