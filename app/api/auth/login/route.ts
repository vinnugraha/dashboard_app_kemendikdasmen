// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Wajib: Prisma di Node runtime (bukan Edge)
export const runtime = 'nodejs'

type LoginBody = { username: string; password: string }

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json()) as LoginBody
    if (!username || !password) {
      return NextResponse.json({ message: 'Username dan password harus diisi' }, { status: 400 })
    }

    // Cari user by username ATAU email
    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email: username }] },
      // Sesuaikan select/include ini dengan relasi hasil prisma db pull kamu
      include: {
        role: { select: { id: true, name: true } },              // @map("role_name") dsb jika ada
        unitKerja: { select: { id: true, nama: true } },         // @map("nama_unit")
        // Jika di schema ada relasi "sestama", biarkan; kalau tidak ada, abaikan
        // @ts-expect-error optional relation
        sestama: { select: { id: true, nama: true } } as any,
      },
    })

    if (!user) {
      return NextResponse.json({ message: 'Username atau password salah' }, { status: 401 })
    }

    // Field hash di Prisma biasanya passwordHash (@map("password_hash"))
    const hash =
      // @ts-ignore – jaga-jaga jika hasil introspeksi tidak memetakan ke camelCase
      (user as any).passwordHash ?? (user as any).password_hash ?? ''

    const ok = await bcrypt.compare(password, hash)
    if (!ok) {
      return NextResponse.json({ message: 'Username atau password salah' }, { status: 401 })
    }

    // Bentuk payload sesuai frontend-mu (pakai snake_case seperti sebelumnya)
    const payload = {
      user_id: user.id,                          // @map("user_id")
      username: user.username,
      email: user.email ?? null,
      role_id: (user as any).roleId ?? null,     // @map("role_id")
      role_name: (user as any).role?.name ?? null,
      unit_id: (user as any).unitKerjaId ?? null, // @map("unit_id")
      unit_name: (user as any).unitKerja?.nama ?? null,
      // kolom "sestama" opsional – akan null jika tak ada di schema
      sestama_id: (user as any).sestamaId ?? null,
      sestama_name: (user as any).sestama?.nama ?? null,
    }

    // Session token sederhana (sebaiknya ganti JWT production)
    const sessionToken = Buffer.from(
      JSON.stringify({ userId: payload.user_id, ts: Date.now() })
    ).toString('base64')

    const res = NextResponse.json({ message: 'Login berhasil', user: payload })
    res.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: '/',
    })
    return res
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan sistem', detail: String(err?.message ?? err) },
      { status: 500 }
    )
  }
}
