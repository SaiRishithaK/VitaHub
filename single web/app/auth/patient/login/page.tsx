"use client"

import PatientAuth from "@/components/patient-auth"
import { useEffect, useState } from "react"

export default function PatientLogIn() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("vitahub-language")
    if (saved) setLanguage(saved)
  }, [])

  if (!mounted) return null

  return <PatientAuth isSignUp={false} language={language} />
}
