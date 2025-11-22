"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface PatientAuthProps {
  isSignUp: boolean
  language: string
}

const content = {
  en: {
    name: "Full Name *",
    email: "Email *",
    phone: "Phone Number *",
    password: "Password *",
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
    phone: "Número Telefónico *",
    password: "Contraseña *",
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
    phone: "फोन नंबर *",
    password: "पासवर्ड *",
    signUp: "साइन अप करें",
    logIn: "लॉग इन करें",
    success: "पंजीकरण सफल!",
    error: "कृपया सभी आवश्यक फ़ील्ड भरें",
    switchTo: "पहले से खाता है? लॉग इन करें",
    backToRole: "भूमिका चयन पर वापस जाएं",
  },
}

export default function PatientAuth({ isSignUp, language }: PatientAuthProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast({
        title: "Error",
        description: t.error,
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const endpoint = isSignUp ? "/api/auth/patient/signup" : "/api/auth/patient/login"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
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
        // Redirect to patient dashboard
        window.location.href = "/patient/dashboard"
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
            <p className="text-green-600">{isSignUp ? "Patient Sign Up" : "Patient Log In"}</p>
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
              placeholder="John Doe"
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
              placeholder="patient@example.com"
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">
              {t.phone}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
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

          <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
            {loading ? "Processing..." : isSignUp ? t.signUp : t.logIn}
          </Button>

          <div className="text-center space-y-2">
            <Link
              href={isSignUp ? "/auth/patient/login" : "/auth/patient/signup"}
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
