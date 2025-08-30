"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  ExternalLink,
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  Globe,
  Shield,
  Code,
  Database,
  Server,
  Settings,
  Edit,
  Trash2,
} from "lucide-react"
import { getStoredUser } from "@/lib/auth"

interface ApplicationDetail {
  application_id: number
  url?: string
  niak?: string
  nama_aplikasi: string
  deskripsi_aplikasi?: string
  output_aplikasi?: string
  nama_pic_pengelola?: string
  nomor_pic_pengelola?: string
  email_pengelola?: string
  unit_id?: number
  sestama_id?: number
  singkatan_aplikasi?: string
  kondisi_aplikasi: "Aktif" | "Tidak Aktif" | "Maintenance"
  jenis_layanan: "Internal" | "Eksternal" | "Hybrid"
  sasaran_layanan?: string
  basis_aplikasi: "Web" | "Mobile" | "Desktop" | "Hybrid"
  tipe_lisensi_aplikasi: "Open Source" | "Proprietary" | "Commercial"
  provinsi_nama?: string
  unit_nama?: string
  sestama_nama?: string
  created_at: string
  updated_at: string
}

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState<ApplicationDetail | null>(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUser(storedUser)
    fetchApplicationDetail()
  }, [params.id, router])

  const fetchApplicationDetail = async () => {
    try {
      const response = await fetch(`/api/applications/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setApplication(data.application)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Aplikasi tidak ditemukan")
      }
    } catch (error) {
      setError("Terjadi kesalahan sistem")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteApplication = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus aplikasi ini?")) {
      return
    }

    try {
      const response = await fetch(`/api/applications/${params.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("Aplikasi berhasil dihapus")
        router.push("/dashboard")
      } else {
        const data = await response.json()
        alert(data.message || "Gagal menghapus aplikasi")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Terjadi kesalahan sistem")
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Aktif":
        return "default"
      case "Tidak Aktif":
        return "destructive"
      case "Maintenance":
        return "secondary"
      default:
        return "outline"
    }
  }

  const canManageApplications = () => {
    return user && ["super_admin", "admin"].includes(user.role_name)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600">Memuat detail aplikasi...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <header className="bg-white border-b border-blue-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <h1 className="text-xl font-bold text-blue-900">Detail Aplikasi</h1>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }

  if (!application) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-xl font-bold text-blue-900">Detail Aplikasi</h1>
                <p className="text-sm text-blue-600">{application.nama_aplikasi}</p>
              </div>
            </div>
            {canManageApplications() && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/dashboard/applications/${params.id}/edit`)}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDeleteApplication}
                  className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-blue-900 mb-2">{application.nama_aplikasi}</CardTitle>
                    <div className="flex items-center gap-4 mb-4">
                      {application.singkatan_aplikasi && (
                        <Badge variant="outline" className="text-blue-700 border-blue-300">
                          {application.singkatan_aplikasi}
                        </Badge>
                      )}
                      <Badge variant={getStatusBadgeVariant(application.kondisi_aplikasi)}>
                        {application.kondisi_aplikasi}
                      </Badge>
                      <Badge variant="secondary">{application.jenis_layanan}</Badge>
                    </div>
                    {application.url && (
                      <a
                        href={application.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {application.url}
                      </a>
                    )}
                  </div>
                </div>
                {application.niak && (
                  <div className="text-sm text-gray-600">
                    <strong>NIAK:</strong> {application.niak}
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {application.deskripsi_aplikasi && (
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Deskripsi Aplikasi</h4>
                    <p className="text-gray-700 leading-relaxed">{application.deskripsi_aplikasi}</p>
                  </div>
                )}
                {application.output_aplikasi && (
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Output Aplikasi</h4>
                    <p className="text-gray-700 leading-relaxed">{application.output_aplikasi}</p>
                  </div>
                )}
                {application.sasaran_layanan && (
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Sasaran Layanan</h4>
                    <p className="text-gray-700">{application.sasaran_layanan}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* PIC Information */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <User className="w-5 h-5 mr-2" />
                  Informasi PIC Pengelola
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {application.nama_pic_pengelola && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Nama PIC</p>
                        <p className="font-medium">{application.nama_pic_pengelola}</p>
                      </div>
                    </div>
                  )}
                  {application.nomor_pic_pengelola && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Nomor HP</p>
                        <p className="font-medium">{application.nomor_pic_pengelola}</p>
                      </div>
                    </div>
                  )}
                  {application.email_pengelola && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{application.email_pengelola}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Technical Information */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Code className="w-5 h-5 mr-2" />
                  Informasi Teknis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Basis Aplikasi</p>
                        <p className="font-medium">{application.basis_aplikasi}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Tipe Lisensi</p>
                        <p className="font-medium">{application.tipe_lisensi_aplikasi}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Database className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Jenis Layanan</p>
                        <p className="font-medium">{application.jenis_layanan}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Server className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <Badge variant={getStatusBadgeVariant(application.kondisi_aplikasi)}>
                          {application.kondisi_aplikasi}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Organizational Information */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Building className="w-5 h-5 mr-2" />
                  Informasi Organisasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.sestama_nama && (
                  <div>
                    <p className="text-sm text-gray-500">Sestama</p>
                    <p className="font-medium text-sm leading-relaxed">{application.sestama_nama}</p>
                  </div>
                )}
                {application.unit_nama && (
                  <div>
                    <p className="text-sm text-gray-500">Unit Kerja</p>
                    <p className="font-medium text-sm leading-relaxed">{application.unit_nama}</p>
                  </div>
                )}
                {application.provinsi_nama && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Provinsi</p>
                      <p className="font-medium">{application.provinsi_nama}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Settings className="w-5 h-5 mr-2" />
                  Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Dibuat</p>
                  <p className="font-medium text-sm">{formatDate(application.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Terakhir Diperbarui</p>
                  <p className="font-medium text-sm">{formatDate(application.updated_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID Aplikasi</p>
                  <p className="font-mono text-sm">{application.application_id}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {application.url && (
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <a href={application.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buka Aplikasi
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
