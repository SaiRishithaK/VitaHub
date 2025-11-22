"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { translations, type Language } from "@/lib/translations"

interface PatientProfileProps {
  patientData: any
  language: Language
  onBack: () => void
}

export default function PatientProfile({ patientData, language, onBack }: PatientProfileProps) {
  const t = translations[language]

  return (
    <Card className="bg-white border-green-300 p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">{t.profile.title}</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center border-b border-green-200 pb-3">
          <span className="text-green-700 font-semibold">{t.profile.name}:</span>
          <span className="text-gray-700">{patientData?.name || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center border-b border-green-200 pb-3">
          <span className="text-green-700 font-semibold">{t.profile.email}:</span>
          <span className="text-gray-700">{patientData?.email || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center border-b border-green-200 pb-3">
          <span className="text-green-700 font-semibold">{t.profile.phone}:</span>
          <span className="text-gray-700">{patientData?.phone_number || "N/A"}</span>
        </div>
      </div>

      <Button onClick={onBack} className="bg-green-600 hover:bg-green-700 w-full">
        {t.profile.backToDashboard}
      </Button>
    </Card>
  )
}
