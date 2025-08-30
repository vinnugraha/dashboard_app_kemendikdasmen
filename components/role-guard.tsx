"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getStoredUser } from "@/lib/auth"
import type { User } from "@/lib/database"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles?: string[]
  fallbackPath?: string
  showUnauthorized?: boolean
}

export function RoleGuard({
  children,
  allowedRoles = [],
  fallbackPath = "/dashboard",
  showUnauthorized = false,
}: RoleGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedUser = getStoredUser()

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUser(storedUser)

    // Check if user has required role
    if (allowedRoles.length === 0 || allowedRoles.includes(storedUser.role_name)) {
      setHasAccess(true)
    } else {
      setHasAccess(false)
      if (!showUnauthorized) {
        router.push(fallbackPath)
        return
      }
    }

    setIsLoading(false)
  }, [allowedRoles, fallbackPath, showUnauthorized, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess && showUnauthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
          <p className="text-sm text-gray-500 mb-6">
            Role Anda: <span className="font-medium">{user?.role_name}</span>
            <br />
            Role yang dibutuhkan: <span className="font-medium">{allowedRoles.join(", ")}</span>
          </p>
          <button
            onClick={() => router.push(fallbackPath)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return null
  }

  return <>{children}</>
}
