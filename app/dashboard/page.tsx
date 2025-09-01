"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { LogOut, Search, Settings, Eye, ExternalLink, Plus, Edit, Trash2 } from "lucide-react"
import { getStoredUser, clearStoredUser } from "@/lib/auth"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSestama, setSelectedSestama] = useState("")
  const [selectedUnitKerja, setSelectedUnitKerja] = useState("")
  const [selectedProvinsi, setSelectedProvinsi] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUser(storedUser)
    fetchApplications()
  }, [router])

  useEffect(() => {
    let filtered = applications

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.nama_aplikasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.niak?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.unit_nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.sestama_nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.kondisi_aplikasi.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSestama) {
      filtered = filtered.filter((app) => app.sestama_nama === selectedSestama)
    }

    if (selectedUnitKerja) {
      filtered = filtered.filter((app) => app.unit_nama === selectedUnitKerja)
    }

    if (selectedProvinsi) {
      filtered = filtered.filter((app) => app.provinsi_nama === selectedProvinsi)
    }

    setFilteredApplications(filtered)
  }, [searchTerm, selectedSestama, selectedUnitKerja, selectedProvinsi, applications])

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications")
      if (response.ok) {
        const data = await response.json()
        setApplications(data.applications)
        setFilteredApplications(data.applications)
      }
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      clearStoredUser()
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      clearStoredUser()
      router.push("/login")
    }
  }

  const handleDeleteApplication = async (applicationId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus aplikasi ini?")) {
      return
    }

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchApplications()
        alert("Aplikasi berhasil dihapus")
      } else {
        const data = await response.json()
        alert(data.message || "Gagal menghapus aplikasi")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Terjadi kesalahan sistem")
    }
  }

  const getStatusBadgeVariant = (status) => {
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

  const getRoleDisplayName = (roleName) => {
    switch (roleName) {
      case "super_admin":
        return "Super Administrator"
      case "admin":
        return "Administrator"
      case "sestama":
        return "Sestama"
      case "unit_kerja":
        return "Unit Kerja"
      default:
        return roleName
    }
  }

  const canManageApplications = () => {
    return user && ["super_admin", "admin"].includes(user.role_name)
  }

  const getUniqueSestamaOptions = () => {
    const sestamaSet = new Set(applications.map((app) => app.sestama_nama).filter(Boolean))
    return Array.from(sestamaSet).sort()
  }

  const getUniqueUnitKerjaOptions = () => {
    const unitKerjaSet = new Set(applications.map((app) => app.unit_nama).filter(Boolean))
    return Array.from(unitKerjaSet).sort()
  }

  const getUniqueProvinsiOptions = () => {
    const provinsiSet = new Set(applications.map((app) => app.provinsi_nama).filter(Boolean))
    return Array.from(provinsiSet).sort()
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">Dashboard Aplikasi</h1>
                <p className="text-sm text-blue-600">Kemendikdasmen</p>
              </div>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <p className="text-xs leading-none text-blue-600">{getRoleDisplayName(user.role_name)}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="border-blue-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Selamat Datang, {user.username}!</CardTitle>
              <CardDescription className="text-blue-100">
                {user.role_name === "super_admin" && "Anda memiliki akses penuh ke semua aplikasi sistem"}
                {user.role_name === "admin" && "Anda dapat mengelola semua aplikasi dalam sistem"}
                {user.role_name === "sestama" && `Anda dapat melihat aplikasi di ${user.sestama_name}`}
                {user.role_name === "unit_kerja" && `Anda dapat melihat aplikasi di ${user.unit_name}`}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Applications Section */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl text-blue-900">Daftar Aplikasi</CardTitle>
                <CardDescription>
                  Menampilkan {filteredApplications.length} dari {applications.length} aplikasi
                </CardDescription>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  <Select value={selectedSestama} onValueChange={setSelectedSestama}>
                    <SelectTrigger className="w-full sm:w-48 border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Filter Sestama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Sestama</SelectItem>
                      {getUniqueSestamaOptions().map((sestama) => (
                        <SelectItem key={sestama} value={sestama}>
                          {sestama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedUnitKerja} onValueChange={setSelectedUnitKerja}>
                    <SelectTrigger className="w-full sm:w-48 border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Filter Unit Kerja" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Unit Kerja</SelectItem>
                      {getUniqueUnitKerjaOptions().map((unitKerja) => (
                        <SelectItem key={unitKerja} value={unitKerja}>
                          {unitKerja}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedProvinsi} onValueChange={setSelectedProvinsi}>
                    <SelectTrigger className="w-full sm:w-48 border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Filter Provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Provinsi</SelectItem>
                      {getUniqueProvinsiOptions().map((provinsi) => (
                        <SelectItem key={provinsi} value={provinsi}>
                          {provinsi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                    <Input
                      placeholder="Cari aplikasi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {canManageApplications() && (
                    <Button
                      onClick={() => router.push("/dashboard/applications/add")}
                      className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Aplikasi
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-blue-600">Memuat data aplikasi...</div>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <ExternalLink className="mx-auto h-12 w-12 text-blue-300 mb-4" />
                  <p className="text-blue-600">
                    {searchTerm ? "Tidak ada aplikasi yang sesuai dengan pencarian" : "Belum ada aplikasi"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-200">
                      <TableHead className="text-blue-900">URL</TableHead>
                      <TableHead className="text-blue-900">NIA</TableHead>
                      <TableHead className="text-blue-900">Nama Aplikasi</TableHead>
                      <TableHead className="text-blue-900">Unit Kerja</TableHead>
                      <TableHead className="text-blue-900">Sestama</TableHead>
                      <TableHead className="text-blue-900">Provinsi</TableHead>
                      <TableHead className="text-blue-900">Kondisi</TableHead>
                      <TableHead className="text-blue-900">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.application_id} className="border-blue-100 hover:bg-blue-50">
                        <TableCell>
                          {app.url ? (
                            <a
                              href={app.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span className="truncate max-w-32">{app.url}</span>
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{app.niak || "-"}</TableCell>
                        <TableCell className="font-medium text-blue-900">{app.nama_aplikasi}</TableCell>
                        <TableCell className="text-sm">{app.unit_nama || "-"}</TableCell>
                        <TableCell className="text-sm">{app.sestama_nama || "-"}</TableCell>
                        <TableCell className="text-sm">{app.provinsi_nama || "-"}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(app.kondisi_aplikasi)}>{app.kondisi_aplikasi}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/dashboard/applications/${app.application_id}`)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Detail
                            </Button>
                            {canManageApplications() && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => router.push(`/dashboard/applications/${app.application_id}/edit`)}
                                  className="text-green-600 hover:text-green-800 hover:bg-green-100"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteApplication(app.application_id)}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Hapus
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
