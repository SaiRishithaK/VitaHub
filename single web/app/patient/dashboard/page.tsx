"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PatientDashboardMenu from "@/components/patient-dashboard-menu"
import type { Language } from "@/lib/translations"

export default function PatientDashboard() {
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState<Language>("en")
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("vitahub-user")
    const savedLanguage = localStorage.getItem("vitahub-language") as Language

    if (!user) {
      router.push("/auth/patient/login")
      return
    }

    setPatient(JSON.parse(user))
    if (savedLanguage) setLanguage(savedLanguage)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("vitahub-user")
    localStorage.removeItem("vitahub-token")
    localStorage.removeItem("vitahub-language")
    router.push("/")
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("vitahub-language", newLanguage)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <p className="text-green-700 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="p-4 bg-green-700 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">VITAHUB</h1>
        <div className="flex gap-2 items-center">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as Language)}
            className="px-3 py-2 rounded bg-green-600 text-white border border-green-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="hi">हिंदी</option>
            <option value="te">తెలుగు</option>
          </select>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <PatientDashboardMenu
          patientId={patient?.id}
          patientData={patient}
          language={language}
          onLogout={handleLogout}
        />
      </div>
    </div>
  )
}
