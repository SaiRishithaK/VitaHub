"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2 } from "lucide-react"

interface TermsProps {
  onAccept: () => void
  language: string
}

const termsContent = {
  en: {
    title: "Welcome to VITAHUB",
    subtitle: "Healthcare Appointment Platform",
    content: `VITAHUB Terms and Conditions

1. Acceptance of Terms
By using VITAHUB, you accept these terms and conditions. If you do not accept, please do not use this service.

2. Service Description
VITAHUB is a healthcare appointment booking platform that connects patients with qualified doctors for medical consultations.

3. User Responsibilities
- Provide accurate information during registration
- Maintain confidentiality of your login credentials
- Use the platform only for legitimate healthcare purposes

4. Doctor Qualifications
All doctors on our platform provide verified credentials including degrees, certifications, and identity verification.

5. Patient Privacy
Your medical information is kept confidential and secure. We comply with healthcare data protection regulations.

6. Appointment Policies
- Patients can book appointments based on doctor availability
- Cancellations must be made 24 hours before the appointment
- No-shows may result in account restrictions

7. Limitation of Liability
VITAHUB is provided 'as is' without warranties. We are not liable for any medical outcomes.

8. Data Protection
Your personal and medical data is protected with industry-standard encryption.

9. Modifications
We reserve the right to modify these terms at any time.

10. Governing Law
These terms are governed by applicable healthcare and data protection laws.`,
    agreeButton: "I Agree & Continue",
    declineButton: "Decline",
  },
  es: {
    title: "Bienvenido a VITAHUB",
    subtitle: "Plataforma de Citas Médicas",
    content: `Términos y Condiciones de VITAHUB

1. Aceptación de Términos
Al usar VITAHUB, aceptas estos términos. Si no los aceptas, por favor no uses este servicio.

2. Descripción del Servicio
VITAHUB es una plataforma para reservar citas médicas que conecta pacientes con médicos calificados.

3. Responsabilidades del Usuario
- Proporcionar información precisa durante el registro
- Mantener confidencialidad de tus credenciales
- Usar la plataforma solo para fines médicos legítimos

4. Calificaciones del Doctor
Todos los médicos tienen credenciales verificadas incluidas títulos y certificaciones.

5. Privacidad del Paciente
Tu información médica se mantiene confidencial y segura.

6. Políticas de Citas
- Los pacientes pueden reservar citas según la disponibilidad del médico
- Las cancelaciones deben hacerse 24 horas antes
- Las ausencias pueden resultar en restricciones

7. Limitación de Responsabilidad
VITAHUB se proporciona 'tal cual' sin garantías.

8. Protección de Datos
Tus datos están protegidos con encriptación estándar de la industria.

9. Modificaciones
Nos reservamos el derecho de modificar estos términos.

10. Ley Aplicable
Estos términos se rigen por las leyes de protección de datos aplicables.`,
    agreeButton: "Acepto & Continuar",
    declineButton: "Rechazar",
  },
  hi: {
    title: "VITAHUB में स्वागत है",
    subtitle: "स्वास्थ्य सेवा नियुक्ति प्लेटफॉर्म",
    content: `VITAHUB नियम और शर्तें

1. शर्तों की स्वीकृति
VITAHUB का उपयोग करके, आप इन शर्तों को स्वीकार करते हैं। यदि आप स्वीकार नहीं करते, तो कृपया इस सेवा का उपयोग न करें।

2. सेवा विवरण
VITAHUB एक स्वास्थ्य सेवा नियुक्ति बुकिंग प्लेटफॉर्म है जो रोगियों को योग्य डॉक्टरों से जोड़ता है।

3. उपयोगकर्ता जिम्मेदारियां
- पंजीकरण के दौरान सटीक जानकारी प्रदान करें
- अपने लॉगिन क्रेडेंशियल की गोपनीयता बनाए रखें
- प्लेटफॉर्म का उपयोग केवल वैध स्वास्थ्य सेवा उद्देश्यों के लिए करें

4. डॉक्टर योग्यता
सभी डॉक्टरों के पास सत्यापित क्रेडेंशियल हैं।

5. रोगी गोपनीयता
आपकी चिकित्सा जानकारी गोपनीय और सुरक्षित है।

6. नियुक्ति नीति
- रोगी डॉक्टर की उपलब्धता के अनुसार नियुक्तियां बुक कर सकते हैं
- रद्दीकरण नियुक्ति से 24 घंटे पहले होना चाहिए
- अनुपस्थिति से खाता प्रतिबंध हो सकता है

7. देयता की सीमा
VITAHUB 'जैसा है' प्रदान किया जाता है।

8. डेटा सुरक्षा
आपके डेटा को उद्योग-मानक एन्क्रिप्शन से सुरक्षित किया जाता है।

9. संशोधन
हम किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं।

10. प्रयोजनीय कानून
ये शर्तें लागू डेटा संरक्षण कानूनों द्वारा शासित होती हैं।`,
    agreeButton: "मैं सहमत हूं & जारी रखें",
    declineButton: "अस्वीकार करें",
  },
}

export default function TermsAndConditions({ onAccept, language }: TermsProps) {
  const t = termsContent[language as keyof typeof termsContent] || termsContent.en

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white border-green-200 shadow-lg">
        <div className="p-8">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-green-700">{t.title}</h1>
          </div>
          <p className="text-center text-green-600 mb-6">{t.subtitle}</p>

          <ScrollArea className="h-80 border border-green-200 rounded-lg p-4 mb-6 bg-green-50">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{t.content}</p>
          </ScrollArea>

          <div className="flex gap-4">
            <Button onClick={onAccept} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              {t.agreeButton}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
            >
              {t.declineButton}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
