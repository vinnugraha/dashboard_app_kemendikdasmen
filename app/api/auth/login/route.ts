// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Pastikan ini berjalan di Node runtime (bukan Edge)
export const runtime = 'nodejs'

type LoginBody = { username: string; password: string }

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json()) as LoginBody

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username dan password harus diisi' },
        { status: 400 }
      )
    }

    // HANYA pakai username (email sudah tidak ada di schema)
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        role: { select: { id: true, name: true } },
        unitKerja: {
          select: {
            id: true,
            nama: true,
            kementerian: { select: { id: true, nama: true } },
            sestama: { select: { id: true, nama: true } },
          },
        },
        // relasi langsung ke Sestama jika ada di model User
        sestama: { select: { id: true, nama: true } },
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Username atau password salah' },
        { status: 401 }
      )
    }

    // password hash: di schema @map("password_hash") -> field TS: passwordHash
    const hash = user.passwordHash ?? ''

    const ok = await bcrypt.compare(password, hash)
    if (!ok) {
      return NextResponse.json(
        { message: 'Username atau password salah' },
        { status: 401 }
      )
    }

    // Bentuk payload yang dipakai di frontend
    const payload = {
      user_id: user.id, // @map("user_id")
      username: user.username,
      role_id: (user as any).roleId ?? null, // @map("role_id")
      role_name: user.role?.name ?? null,
      unit_id: (user as any).unitKerjaId ?? null, // @map("unit_id")
      unit_name: user.unitKerja?.nama ?? null,
      kementerian_id: (user as any).unitKerja?.kementerian?.id ?? null,
      kementerian_name: (user as any).unitKerja?.kementerian?.nama ?? null,
      // Sestama bisa dari relasi langsung di User atau dari UnitKerja
      sestama_id: (user as any).sestamaId ?? user.unitKerja?.sestama?.id ?? null,
      sestama_name: user.sestama?.nama ?? user.unitKerja?.sestama?.nama ?? null,
    }

    // Session sederhana (gantikan dengan JWT/iron-session sesuai kebutuhan)
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
    console.error('LOGIN_ERROR', err)
    return NextResponse.json(
      { message: 'Terjadi kesalahan sistem' },
      { status: 500 }
    )
  }
}
