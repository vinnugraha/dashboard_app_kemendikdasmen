import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function ensureKementerian(nama: string) {
  const existing = await prisma.kementerian.findFirst({ where: { nama } })
  if (existing) return existing.id
  const created = await prisma.kementerian.create({ data: { nama } })
  return created.id
}

async function ensureUnitKerja(nama: string, kementerianId: number) {
  const existing = await prisma.unitKerja.findFirst({ where: { nama } })
  if (existing) return existing.id
  const created = await prisma.unitKerja.create({
    data: { nama, kementerianId },
  })
  return created.id
}

async function ensureRole(name: string, desc?: string) {
  const existing = await prisma.role.findFirst({ where: { name } })
  if (existing) return existing.id
  const created = await prisma.role.create({
    data: { name, ...(desc ? { desc } : {}) },
  })
  return created.id
}

async function ensureUser(
  username: string,
  password: string,
  roleId: number,
  unitKerjaId: number,
) {
  const existing = await prisma.user.findFirst({ where: { username } })
  if (existing) return existing.id

  const passwordHash = await bcrypt.hash(password, 10)

  // Perhatikan: TIDAK ada field "email" di create()
  const created = await prisma.user.create({
    data: {
      username,
      passwordHash, // @map("password_hash") di DB, di Prisma jadi camelCase
      roleId,       // @map("role_id")
      unitKerjaId,  // @map("unit_id")
    },
  })
  return created.id
}

async function main() {
  // 1) Master wajib ada dulu agar FK tidak error
  const kemId = await ensureKementerian('Kemendikbudristek')
  const unitId = await ensureUnitKerja('Pusdatin', kemId)

  // 2) Roles
  const roleSuperAdmin = await ensureRole('Super Admin')
  const roleAdmin      = await ensureRole('Admin')
  const roleSestama    = await ensureRole('Sestama')
  const roleUnit       = await ensureRole('Unit Kerja')

  // 3) Users demo (tanpa email)
  await ensureUser('superadmin',     'password123', roleSuperAdmin, unitId)
  await ensureUser('admin1',         'password123', roleAdmin,      unitId)
  await ensureUser('sestama_setjen', 'password123', roleSestama,    unitId)
  await ensureUser('pusdatin',       'password123', roleUnit,       unitId)
}

main()
  .then(async () => {
    console.log('✅ Seed selesai')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed gagal:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
