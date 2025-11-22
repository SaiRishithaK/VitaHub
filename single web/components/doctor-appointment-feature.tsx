// <CHANGE> Add better error handling and improve the flow
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { translations, type Language } from "@/lib/translations"

interface DoctorAppointmentFeatureProps {
  patientId: string
  language: Language
  onBack: () => void
}

export default function DoctorAppointmentFeature({ patientId, language, onBack }: DoctorAppointmentFeatureProps) {
  const [doctors, setDoctors] = useState<any[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [slots, setSlots] = useState<any[]>([])
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [bookedConfirmation, setBookedConfirmation] = useState<any>(null)
  const [error, setError] = useState<string>("")

  const t = translations[language]

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      setError("")
      console.log("[v0] Fetching doctors list")
      const response = await fetch("/api/doctors")
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      console.log("[v0] Doctors fetched:", data)
      setDoctors(data)
    } catch (error) {
      console.error("[v0] Error fetching doctors:", error)
      setError("Failed to load doctors. Please try again.")
      setDoctors([])
    } finally {
      setLoading(false)
    }
  }

  const handleDoctorSelect = async (doctor: any) => {
    setSelectedDoctor(doctor)
    try {
      setLoading(true)
      setError("")
      console.log("[v0] Fetching slots for doctor:", doctor.id)
      const response = await fetch(`/api/doctor/${doctor.id}/slots`)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      console.log("[v0] Slots fetched:", data)
      setSlots(data)
    } catch (error) {
      console.error("[v0] Error fetching slots:", error)
      setError("Failed to load appointment slots. Please try again.")
      setSlots([])
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async () => {
    if (!selectedSlot || !selectedDoctor) return

    try {
      setLoading(true)
      setError("")
      console.log("[v0] Booking appointment:", { patientId, doctorId: selectedDoctor.id, slotId: selectedSlot.id })
      const response = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          doctorId: selectedDoctor.id,
          slotId: selectedSlot.id,
          appointmentDate: new Date().toISOString().split("T")[0],
        }),
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      console.log("[v0] Appointment booked successfully:", data)
      setBookedConfirmation({
        doctor: selectedDoctor.name,
        date: new Date().toLocaleDateString(),
        time: selectedSlot.start_time,
      })
      setSelectedDoctor(null)
      setSelectedSlot(null)
      setSlots([])
    } catch (error) {
      console.error("[v0] Error booking appointment:", error)
      setError("Failed to book appointment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (bookedConfirmation) {
    return (
      <Card className="bg-white border-green-300 p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-700 mb-4">{t.doctorAppointment.appointmentBooked}</h3>
        <p className="text-gray-700 mb-2">
          {t.doctorAppointment.bookedAt} <span className="font-semibold">{bookedConfirmation.doctor}</span>
        </p>
        <p className="text-gray-700 mb-6">
          {t.doctorAppointment.on} <span className="font-semibold">{bookedConfirmation.date}</span>{" "}
          {t.doctorAppointment.at} <span className="font-semibold">{bookedConfirmation.time}</span>
        </p>
        <Button onClick={onBack} className="bg-green-600 hover:bg-green-700 w-full">
          {t.profile.backToDashboard}
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-green-300 p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">{t.doctorAppointment.title}</h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

        {!selectedDoctor ? (
          <div>
            <p className="text-green-700 font-semibold mb-4">{t.doctorAppointment.selectDoctor}</p>
            <div className="grid gap-4">
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <Button
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="bg-green-100 hover:bg-green-200 text-green-700 text-left p-4 h-auto"
                  >
                    <div className="text-left">
                      <p className="font-semibold">{doctor.name}</p>
                      <p className="text-sm">{doctor.specialization || "General"}</p>
                      <p className="text-xs text-gray-600">{doctor.email}</p>
                    </div>
                  </Button>
                ))
              ) : (
                <p className="text-gray-600">{loading ? "Loading doctors..." : "No doctors available"}</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-4">
              Selected Doctor: <span className="font-semibold text-green-700">{selectedDoctor.name}</span>
            </p>

            {!selectedSlot ? (
              <div>
                <p className="text-green-700 font-semibold mb-4">{t.doctorAppointment.selectSlot}</p>
                <div className="grid gap-2">
                  {slots.length > 0 ? (
                    slots.map((slot) => (
                      <Button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className="bg-green-100 hover:bg-green-200 text-green-700 text-left p-4 h-auto justify-start"
                      >
                        <div className="text-left w-full">
                          <p className="font-semibold">{slot.day_of_week}</p>
                          <p className="text-sm">
                            {slot.start_time} - {slot.end_time}
                          </p>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <p className="text-gray-600">{loading ? "Loading slots..." : "No available slots"}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700">
                  Selected Slot: <span className="font-semibold">{selectedSlot.day_of_week}</span> at{" "}
                  <span className="font-semibold">{selectedSlot.start_time}</span>
                </p>
                <Button
                  onClick={handleBookAppointment}
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                  disabled={loading}
                >
                  {loading ? "Booking..." : t.doctorAppointment.bookAppointment}
                </Button>
              </div>
            )}
          </div>
        )}

        {!selectedDoctor && (
          <Button onClick={onBack} className="bg-gray-600 hover:bg-gray-700 w-full mt-4">
            {t.profile.backToDashboard}
          </Button>
        )}
      </Card>
    </div>
  )
}
