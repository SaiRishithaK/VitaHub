"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageSelectorProps {
  language: string
  onLanguageChange: (lang: string) => void
}

export default function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "hi", label: "हिंदी" },
  ]

  const handleLanguageChange = (code: string) => {
    onLanguageChange(code)
    localStorage.setItem("vitahub-language", code)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white border-green-300 hover:bg-green-50">
          {language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
