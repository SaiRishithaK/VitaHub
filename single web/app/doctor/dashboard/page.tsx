"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import DoctorSlotManager from "@/components/doctor-slot-manager"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState("en")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("vitahub-user")
    const savedLanguage = localStorage.getItem("vitahub-language")

    if (!user) {
      router.push("/auth/doctor/login")
      return
    }

    setDoctor(JSON.parse(user))
    if (savedLanguage) setLanguage(savedLanguage)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("vitahub-user")
    localStorage.removeItem("vitahub-token")
    toast({
      title: "Success",
      description: "You have been logged out successfully",
    })
    router.push("/")
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
        <h1 className="text-2xl font-bold">VITAHUB - Doctor Dashboard</h1>
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Card className="bg-white border-green-300 p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-2">Welcome, Dr. {doctor?.name}</h2>
          <p className="text-green-600 font-semibold">You are successfully logged in!</p>
        </Card>

        <DoctorSlotManager doctorId={doctor?.id} language={language} />
      </div>
    </div>
  )
}
