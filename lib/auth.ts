"use client"

import type { User } from "./database"

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

export function clearStoredUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}

export function hasPermission(user: User | null, requiredRole?: string[]): boolean {
  if (!user) return false

  if (!requiredRole || requiredRole.length === 0) return true

  return requiredRole.includes(user.role_name)
}

export function canViewApplication(user: User | null, application: any): boolean {
  if (!user) return false

  switch (user.role_name) {
    case "super_admin":
    case "admin":
      return true
    case "sestama":
      return application.sestama_id === user.sestama_id
    case "unit_kerja":
      return application.unit_id === user.unit_id
    default:
      return false
  }
}
