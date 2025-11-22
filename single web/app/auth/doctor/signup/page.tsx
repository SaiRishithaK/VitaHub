"use client"

import DoctorAuth from "@/components/doctor-auth"
import { useEffect, useState } from "react"

export default function DoctorSignUp() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("vitahub-language")
    if (saved) setLanguage(saved)
  }, [])

  if (!mounted) return null

  return <DoctorAuth isSignUp={true} language={language} />
}
