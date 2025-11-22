"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { translations, type Language } from "@/lib/translations"
import PatientProfile from "@/components/patient-profile"
import DoctorAppointmentFeature from "@/components/doctor-appointment-feature"
import MedicalTestBooking from "@/components/medical-test-booking"

type Feature =
  | "menu"
  | "profile"
  | "doctor-appointment"
  | "medical-test"
  | "symptoms"
  | "medicines"
  | "blood"
  | "firstaid"
  | "sos"

interface PatientDashboardMenuProps {
  patientId: string
  patientData: any
  language: Language
  onLogout: () => void
}

export default function PatientDashboardMenu({
  patientId,
  patientData,
  language,
  onLogout,
}: PatientDashboardMenuProps) {
  const [currentFeature, setCurrentFeature] = useState<Feature>("menu")
  const t = translations[language]

  const menuButtons = [
    { id: "profile", label: t.dashboard.profile, icon: "👤" },
    { id: "symptoms", label: t.dashboard.symptomChecker, icon: "🔍" },
    { id: "doctor-appointment", label: t.dashboard.doctorAppointment, icon: "👨‍⚕️" },
    { id: "medical-test", label: t.dashboard.bookMedicalTest, icon: "🩺" },
    { id: "medicines", label: t.dashboard.orderMedicines, icon: "💊" },
    { id: "blood", label: t.dashboard.bloodDonation, icon: "🩸" },
    { id: "firstaid", label: t.dashboard.firstAidGuidance, icon: "🏥" },
    { id: "sos", label: t.dashboard.sos, icon: "🆘" },
  ]

  const renderFeature = () => {
    switch (currentFeature) {
      case "profile":
        return <PatientProfile patientData={patientData} language={language} onBack={() => setCurrentFeature("menu")} />
      case "doctor-appointment":
        return (
          <DoctorAppointmentFeature
            patientId={patientId}
            language={language}
            onBack={() => setCurrentFeature("menu")}
          />
        )
      case "medical-test":
        return <MedicalTestBooking patientId={patientId} language={language} onBack={() => setCurrentFeature("menu")} />
      case "symptoms":
      case "medicines":
      case "blood":
      case "firstaid":
      case "sos":
        return (
          <Card className="bg-white border-green-300 p-8 text-center">
            <p className="text-green-700 text-lg font-semibold mb-4">Feature Coming Soon</p>
            <Button onClick={() => setCurrentFeature("menu")} className="bg-green-600 hover:bg-green-700">
              Back to Menu
            </Button>
          </Card>
        )
      default:
        return (
          <div>
            <Card className="bg-white border-green-300 p-6 mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">{t.dashboard.title}</h2>
              <p className="text-green-600">{t.dashboard.successLogin}</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {menuButtons.map((btn) => (
                <Button
                  key={btn.id}
                  onClick={() => setCurrentFeature(btn.id as Feature)}
                  className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-24 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-2xl mb-2">{btn.icon}</span>
                  <span className="text-xs font-semibold">{btn.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {currentFeature !== "menu" && (
        <Button onClick={() => setCurrentFeature("menu")} className="bg-green-600 hover:bg-green-700">
          ← Back to Menu
        </Button>
      )}
      {renderFeature()}
    </div>
  )
}
