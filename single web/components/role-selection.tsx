"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface RoleSelectionProps {
  language: string
}

const content = {
  en: {
    selectRole: "Select Your Role",
    doctorTitle: "I am a Doctor",
    doctorDesc: "Register as a healthcare professional",
    patientTitle: "I am a Patient",
    patientDesc: "Book appointments with doctors",
    login: "Login",
    signup: "Sign Up",
    chooseAction: "Choose what you'd like to do",
  },
  es: {
    selectRole: "Selecciona tu Rol",
    doctorTitle: "Soy Médico",
    doctorDesc: "Regístrate como profesional de salud",
    patientTitle: "Soy Paciente",
    patientDesc: "Reserva citas con médicos",
    login: "Iniciar Sesión",
    signup: "Registrarse",
    chooseAction: "Elige qué te gustaría hacer",
  },
  hi: {
    selectRole: "अपनी भूमिका चुनें",
    doctorTitle: "मैं एक डॉक्टर हूं",
    doctorDesc: "स्वास्थ्य सेवा पेशेवर के रूप में पंजीकरण करें",
    patientTitle: "मैं एक रोगी हूं",
    patientDesc: "डॉक्टरों के साथ नियुक्तियां बुक करें",
    login: "लॉगिन करें",
    signup: "साइन अप करें",
    chooseAction: "चुनें कि आप क्या करना चाहते हैं",
  },
}

export default function RoleSelection({ language }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<"doctor" | "patient" | null>(null)
  const t = content[language as keyof typeof content] || content.en

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-green-700 mb-12 text-center">{t.selectRole}</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Doctor Card */}
          <Card
            onClick={() => setSelectedRole("doctor")}
            className="bg-white border-green-300 hover:border-green-500 cursor-pointer transition-all h-64 flex flex-col items-center justify-center p-8 hover:shadow-lg hover:scale-105"
          >
            <Stethoscope className="w-16 h-16 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">{t.doctorTitle}</h2>
            <p className="text-gray-600 text-center">{t.doctorDesc}</p>
          </Card>

          {/* Patient Card */}
          <Card
            onClick={() => setSelectedRole("patient")}
            className="bg-white border-green-300 hover:border-green-500 cursor-pointer transition-all h-64 flex flex-col items-center justify-center p-8 hover:shadow-lg hover:scale-105"
          >
            <Users className="w-16 h-16 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">{t.patientTitle}</h2>
            <p className="text-gray-600 text-center">{t.patientDesc}</p>
          </Card>
        </div>
      </div>
    )
  }

  const basePath = `/auth/${selectedRole}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-green-300 shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">VITAHUB</h1>
          <p className="text-green-600">{t.chooseAction}</p>
        </div>

        <div className="space-y-4">
          <Link href={`${basePath}/login`} className="block">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg">{t.login}</Button>
          </Link>

          <Link href={`${basePath}/signup`} className="block">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-lg">{t.signup}</Button>
          </Link>

          <Button
            onClick={() => setSelectedRole(null)}
            variant="outline"
            className="w-full border-green-300 text-green-600 hover:bg-green-50 h-10"
          >
            Back
          </Button>
        </div>
      </Card>
    </div>
  )
}
