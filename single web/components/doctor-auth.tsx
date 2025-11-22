"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"
import Link from "next/link"

interface DoctorAuthProps {
  isSignUp: boolean
  language: string
}

const content = {
  en: {
    name: "Full Name *",
    email: "Email *",
    password: "Password *",
    degree: "Degree/Qualification *",
    certificate: "Upload Certificate *",
    aadhar: "Upload Aadhar *",
    signUp: "Sign Up",
    logIn: "Log In",
    success: "Registration successful!",
    error: "Please fill all required fields",
    switchTo: "Already have account? Log in",
    backToRole: "Back to Role Selection",
  },
  es: {
    name: "Nombre Completo *",
    email: "Correo *",
    password: "Contraseña *",
    degree: "Título/Calificación *",
    certificate: "Cargar Certificado *",
    aadhar: "Cargar Aadhar *",
    signUp: "Registrarse",
    logIn: "Iniciar Sesión",
    success: "¡Registro exitoso!",
    error: "Por favor rellena todos los campos",
    switchTo: "¿Ya tienes cuenta? Inicia sesión",
    backToRole: "Volver a Selección de Rol",
  },
  hi: {
    name: "पूरा नाम *",
    email: "ईमेल *",
    password: "पासवर्ड *",
    degree: "डिग्री/योग्यता *",
    certificate: "प्रमाण पत्र अपलोड करें *",
    aadhar: "आधार अपलोड करें *",
    signUp: "साइन अप करें",
    logIn: "लॉग इन करें",
    success: "पंजीकरण सफल!",
    error: "कृपया सभी आवश्यक फ़ील्ड भरें",
    switchTo: "पहले से खाता है? लॉग इन करें",
    backToRole: "भूमिका चयन पर वापस जाएं",
  },
}

export default function DoctorAuth({ isSignUp, language }: DoctorAuthProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    degree: "",
    certificateFile: null as File | null,
    aadharFile: null as File | null,
  })

  const { toast } = useToast()
  const t = content[language as keyof typeof content] || content.en

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.degree) {
      toast({
        title: "Error",
        description: t.error,
        variant: "destructive",
      })
      return
    }

    if (isSignUp && (!formData.certificateFile || !formData.aadharFile)) {
      toast({
        title: "Error",
        description: "Please upload all required documents",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const endpoint = isSignUp ? "/api/auth/doctor/signup" : "/api/auth/doctor/login"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          degree: formData.degree,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: t.success,
        })
        // Store user data in localStorage
        localStorage.setItem("vitahub-user", JSON.stringify(data.user))
        localStorage.setItem("vitahub-token", data.token)
        // Redirect to doctor dashboard
        window.location.href = "/doctor/dashboard"
      } else {
        toast({
          title: "Error",
          description: data.message || "Authentication failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Auth error:", error)
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-green-300 shadow-lg">
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-green-700 mb-2">VITAHUB</h1>
            <p className="text-green-600">{isSignUp ? "Doctor Sign Up" : "Doctor Log In"}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              {t.name}
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Dr. John Smith"
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              {t.email}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="doctor@example.com"
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              {t.password}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree" className="text-gray-700">
              {t.degree}
            </Label>
            <Input
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              placeholder="MD, MBBS, etc."
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {isSignUp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="certificate" className="text-gray-700">
                  {t.certificate}
                </Label>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 hover:bg-green-50">
                  <input
                    id="certificate"
                    type="file"
                    onChange={(e) => handleFileChange(e, "certificateFile")}
                    className="hidden"
                    accept="image/*,.pdf"
                  />
                  <label htmlFor="certificate" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.certificateFile?.name || "Click to upload certificate"}
                    </p>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhar" className="text-gray-700">
                  {t.aadhar}
                </Label>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 hover:bg-green-50">
                  <input
                    id="aadhar"
                    type="file"
                    onChange={(e) => handleFileChange(e, "aadharFile")}
                    className="hidden"
                    accept="image/*,.pdf"
                  />
                  <label htmlFor="aadhar" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{formData.aadharFile?.name || "Click to upload Aadhar"}</p>
                  </label>
                </div>
              </div>
            </>
          )}

          <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
            {loading ? "Processing..." : isSignUp ? t.signUp : t.logIn}
          </Button>

          <div className="text-center space-y-2">
            <Link
              href={isSignUp ? "/auth/doctor/login" : "/auth/doctor/signup"}
              className="text-green-600 hover:text-green-700 text-sm"
            >
              {t.switchTo}
            </Link>
            <br />
            <Link href="/" className="text-green-600 hover:text-green-700 text-sm">
              {t.backToRole}
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
