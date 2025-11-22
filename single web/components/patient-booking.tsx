"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock } from "lucide-react"

interface Doctor {
  id: string
  name: string
  email: string
}

interface Slot {
  id: string
  doctorId: string
  dayOfWeek: string
  startTime: string
  endTime: string
}

interface PatientBookingProps {
  patientId: string
  language?: string
}

const content = {
  en: {
    availableDoctors: "Available Doctors",
    availableSlots: "Available Slots",
    noDoctors: "No doctors available",
    selectDoctor: "Select a doctor to see their slots",
    noSlots: "No slots available",
    book: "Book",
    loadingDoctors: "Loading doctors...",
  },
  es: {
    availableDoctors: "Médicos Disponibles",
    availableSlots: "Franjas Disponibles",
    noDoctors: "No hay médicos disponibles",
    selectDoctor: "Selecciona un médico para ver sus franjas",
    noSlots: "No hay franjas disponibles",
    book: "Reservar",
    loadingDoctors: "Cargando médicos...",
  },
  hi: {
    availableDoctors: "उपलब्ध डॉक्टर",
    availableSlots: "उपलब्ध स्लॉट",
    noDoctors: "कोई डॉक्टर उपलब्ध नहीं है",
    selectDoctor: "उनके स्लॉट देखने के लिए एक डॉक्टर का चयन करें",
    noSlots: "कोई स्लॉट उपलब्ध नहीं है",
    book: "बुकिंग करें",
    loadingDoctors: "डॉक्टर लोड किए जा रहे हैं...",
  },
}

export default function PatientBooking({ patientId, language = "en" }: PatientBookingProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const t = content[language as keyof typeof content] || content.en

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/doctors")
      const data = await response.json()
      if (response.ok) {
        setDoctors(data.doctors || [])
      }
    } catch (error) {
      console.error("[v0] Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectDoctor = async (doctorId: string) => {
    setSelectedDoctor(doctorId)
    try {
      const response = await fetch(`/api/doctor/${doctorId}/slots`)
      const data = await response.json()
      if (response.ok) {
        setSlots(data.slots || [])
      }
    } catch (error) {
      console.error("[v0] Error:", error)
    }
  }

  const handleBookSlot = async (slotId: string) => {
    try {
      const response = await fetch("/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          slotId,
          doctorId: selectedDoctor,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Appointment booked successfully!",
        })
        handleSelectDoctor(selectedDoctor!)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to book appointment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error:", error)
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Doctors List */}
      <Card className="bg-white border-green-300 p-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">{t.availableDoctors}</h3>

        {loading ? (
          <p>{t.loadingDoctors}</p>
        ) : doctors.length === 0 ? (
          <p className="text-gray-500">{t.noDoctors}</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {doctors.map((doctor) => (
              <Button
                key={doctor.id}
                onClick={() => handleSelectDoctor(doctor.id)}
                variant={selectedDoctor === doctor.id ? "default" : "outline"}
                className={`w-full text-left justify-start p-4 h-auto ${
                  selectedDoctor === doctor.id
                    ? "bg-green-600 text-white"
                    : "border-green-300 text-green-700 hover:bg-green-50"
                }`}
              >
                <div>
                  <p className="font-semibold">{doctor.name}</p>
                  <p className="text-sm opacity-75">{doctor.email}</p>
                </div>
              </Button>
            ))}
          </div>
        )}
      </Card>

      {/* Available Slots */}
      <Card className="bg-white border-green-300 p-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">{t.availableSlots}</h3>

        {!selectedDoctor ? (
          <p className="text-gray-500">{t.selectDoctor}</p>
        ) : slots.length === 0 ? (
          <p className="text-gray-500">{t.noSlots}</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <p className="font-semibold text-green-700">{slot.dayOfWeek}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-gray-600">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
                </div>
                <Button onClick={() => handleBookSlot(slot.id)} className="bg-green-600 hover:bg-green-700 text-white">
                  {t.book}
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
