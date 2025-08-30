"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Plus } from "lucide-react"
import { RoleGuard } from "@/components/role-guard"

export default function AddApplicationPage() {
  const [formData, setFormData] = useState({
    url: "",
    niak: "",
    nama_aplikasi: "",
    deskripsi_aplikasi: "",
    output_aplikasi: "",
    nama_pic_pengelola: "",
    nomor_pic_pengelola: "",
    email_pengelola: "",
    unit_id: "",
    sestama_id: "",
    singkatan_aplikasi: "",
    kondisi_aplikasi: "Aktif",
    jenis_layanan: "Internal",
    sasaran_layanan: "",
    basis_aplikasi: "Web",
    tipe_lisensi_aplikasi: "Proprietary",
    provinsi_nama: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Aplikasi berhasil ditambahkan!")
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError(data.message || "Gagal menambahkan aplikasi")
      }
    } catch (error) {
      setError("Terjadi kesalahan sistem")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RoleGuard allowedRoles={["super_admin", "admin"]} showUnauthorized={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Header */}
        <header className="bg-white border-b border-blue-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-xl font-bold text-blue-900">Tambah Aplikasi Baru</h1>
                <p className="text-sm text-blue-600">Masukkan informasi aplikasi yang akan didaftarkan</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <Plus className="w-5 h-5 mr-2" />
                Form Tambah Aplikasi
              </CardTitle>
              <CardDescription>
                Lengkapi semua informasi yang diperlukan untuk mendaftarkan aplikasi baru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-700">{success}</AlertDescription>
                  </Alert>
                )}

                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">Informasi Dasar</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nama_aplikasi" className="text-blue-900">
                        Nama Aplikasi *
                      </Label>
                      <Input
                        id="nama_aplikasi"
                        value={formData.nama_aplikasi}
                        onChange={(e) => handleInputChange("nama_aplikasi", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="singkatan_aplikasi" className="text-blue-900">
                        Singkatan Aplikasi
                      </Label>
                      <Input
                        id="singkatan_aplikasi"
                        value={formData.singkatan_aplikasi}
                        onChange={(e) => handleInputChange("singkatan_aplikasi", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="url" className="text-blue-900">
                        URL Aplikasi
                      </Label>
                      <Input
                        id="url"
                        type="url"
                        value={formData.url}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="niak" className="text-blue-900">
                        NIAK
                      </Label>
                      <Input
                        id="niak"
                        value={formData.niak}
                        onChange={(e) => handleInputChange("niak", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="NIAK-2024-001"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deskripsi_aplikasi" className="text-blue-900">
                      Deskripsi Aplikasi
                    </Label>
                    <Textarea
                      id="deskripsi_aplikasi"
                      value={formData.deskripsi_aplikasi}
                      onChange={(e) => handleInputChange("deskripsi_aplikasi", e.target.value)}
                      className="border-blue-200 focus:border-blue-500"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="output_aplikasi" className="text-blue-900">
                      Output Aplikasi
                    </Label>
                    <Textarea
                      id="output_aplikasi"
                      value={formData.output_aplikasi}
                      onChange={(e) => handleInputChange("output_aplikasi", e.target.value)}
                      className="border-blue-200 focus:border-blue-500"
                      rows={2}
                    />
                  </div>
                </div>

                {/* PIC Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">
                    Informasi PIC Pengelola
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nama_pic_pengelola" className="text-blue-900">
                        Nama PIC Pengelola
                      </Label>
                      <Input
                        id="nama_pic_pengelola"
                        value={formData.nama_pic_pengelola}
                        onChange={(e) => handleInputChange("nama_pic_pengelola", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nomor_pic_pengelola" className="text-blue-900">
                        Nomor HP PIC
                      </Label>
                      <Input
                        id="nomor_pic_pengelola"
                        value={formData.nomor_pic_pengelola}
                        onChange={(e) => handleInputChange("nomor_pic_pengelola", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="081234567890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email_pengelola" className="text-blue-900">
                        Email PIC
                      </Label>
                      <Input
                        id="email_pengelola"
                        type="email"
                        value={formData.email_pengelola}
                        onChange={(e) => handleInputChange("email_pengelola", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="pic@kemdikbud.go.id"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">
                    Informasi Teknis
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="kondisi_aplikasi" className="text-blue-900">
                        Kondisi Aplikasi
                      </Label>
                      <Select
                        value={formData.kondisi_aplikasi}
                        onValueChange={(value) => handleInputChange("kondisi_aplikasi", value)}
                      >
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jenis_layanan" className="text-blue-900">
                        Jenis Layanan
                      </Label>
                      <Select
                        value={formData.jenis_layanan}
                        onValueChange={(value) => handleInputChange("jenis_layanan", value)}
                      >
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Internal">Internal</SelectItem>
                          <SelectItem value="Eksternal">Eksternal</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="basis_aplikasi" className="text-blue-900">
                        Basis Aplikasi
                      </Label>
                      <Select
                        value={formData.basis_aplikasi}
                        onValueChange={(value) => handleInputChange("basis_aplikasi", value)}
                      >
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web">Web</SelectItem>
                          <SelectItem value="Mobile">Mobile</SelectItem>
                          <SelectItem value="Desktop">Desktop</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipe_lisensi_aplikasi" className="text-blue-900">
                        Tipe Lisensi
                      </Label>
                      <Select
                        value={formData.tipe_lisensi_aplikasi}
                        onValueChange={(value) => handleInputChange("tipe_lisensi_aplikasi", value)}
                      >
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open Source">Open Source</SelectItem>
                          <SelectItem value="Proprietary">Proprietary</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sasaran_layanan" className="text-blue-900">
                        Sasaran Layanan
                      </Label>
                      <Input
                        id="sasaran_layanan"
                        value={formData.sasaran_layanan}
                        onChange={(e) => handleInputChange("sasaran_layanan", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="Guru dan Tenaga Kependidikan"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provinsi_nama" className="text-blue-900">
                        Provinsi
                      </Label>
                      <Input
                        id="provinsi_nama"
                        value={formData.provinsi_nama}
                        onChange={(e) => handleInputChange("provinsi_nama", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="DKI Jakarta"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-blue-200">
                  <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                    Batal
                  </Button>
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Simpan Aplikasi
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </RoleGuard>
  )
}
