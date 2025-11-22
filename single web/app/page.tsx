"use client"

import { useState, useEffect } from "react"
import TermsAndConditions from "@/components/terms-and-conditions"
import RoleSelection from "@/components/role-selection"
import LanguageSelector from "@/components/language-selector"

export default function Home() {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved language preference
    const savedLang = localStorage.getItem("vitahub-language")
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  if (!mounted) return null

  if (!termsAccepted) {
    return <TermsAndConditions onAccept={() => setTermsAccepted(true)} language={language} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="absolute top-4 right-4">
        <LanguageSelector language={language} onLanguageChange={setLanguage} />
      </div>
      <RoleSelection language={language} />
    </div>
  )
}
