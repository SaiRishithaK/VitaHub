// <CHANGE> Add fallback location and better error handling
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { translations, type Language } from "@/lib/translations"

interface MedicalTestBookingProps {
  patientId: string
  language: Language
  onBack: () => void
}

export default function MedicalTestBooking({ patientId, language, onBack }: MedicalTestBookingProps) {
  const [tests, setTests] = useState<any[]>([])
  const [selectedTest, setSelectedTest] = useState<any>(null)
  const [diagnosticCenters, setDiagnosticCenters] = useState<any[]>([])
  const [selectedCenter, setSelectedCenter] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [bookedConfirmation, setBookedConfirmation] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<any>({ latitude: 28.6139, longitude: 77.2090 })
  const [error, setError] = useState<string>("")

  const t = translations[language]

  useEffect(() => {
    fetchTests()
    fetchUserLocation()
  }, [])

  const fetchTests = async () => {
    try {
      setLoading(true)
      setError("")
      console.log("[v0] Fetching medical tests")
      const response = await fetch("/api/medical-tests")
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      console.log("[v0] Tests fetched:", data)
      setTests(data)
    } catch (error) {
      console.error("[v0] Error fetching tests:", error)
      setError("Failed to load tests. Please try again.")
      setTests([])
    } finally {
      setLoading(false)
    }
  }

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          console.log("[v0] Location acquired:", loc)
          setUserLocation(loc)
        },
        (error) => {
          console.log("[v0] Geolocation denied or unavailable, using default location")
          // Use default location (New Delhi) as fallback
          setUserLocation({ latitude: 28.6139, longitude: 77.2090 })
        },
      )
    }
  }

  const handleTestSelect = async (test: any) => {
    setSelectedTest(test)
    if (userLocation) {
      try {
        setLoading(true)
        setError("")
        console.log("[v0] Fetching diagnostic centers for:", userLocation)
        const response = await fetch(
          `/api/diagnostic-centers?lat=${userLocation.latitude}&lng=${userLocation.longitude}`,
        )
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        console.log("[v0] Centers fetched:", data)
        setDiagnosticCenters(data)
      } catch (error) {
        console.error("[v0] Error fetching centers:", error)
        setError("Failed to load diagnostic centers. Please try again.")
        setDiagnosticCenters([])
      } finally {
        setLoading(false)
      }
    }
  }

  const handleBookTest = async () => {
    if (!selectedTest || !selectedCenter) return

    try {
      setLoading(true)
      setError("")
      console.log("[v0] Booking test:", { patientId, testId: selectedTest.id, centerId: selectedCenter.id })
      const response = await fetch("/api/test-bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          testId: selectedTest.id,
          diagnosticCenterId: selectedCenter.id,
          bookingDate: new Date().toISOString().split("T")[0],
          bookingTime: "09:00",
        }),
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      console.log("[v0] Test booked successfully:", data)
      setBookedConfirmation({
        testName: selectedTest.name,
        centerName: selectedCenter.name,
        date: new Date().toLocaleDateString(),
      })
      setSelectedTest(null)
      setSelectedCenter(null)
    } catch (error) {
      console.error("[v0] Error booking test:", error)
      setError("Failed to book test. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (bookedConfirmation) {
    return (
      <Card className="bg-white border-green-300 p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-700 mb-4">{t.medicalTest.testBooked}</h3>
        <p className="text-gray-700 mb-2">
          {t.medicalTest.bookedAt} <span className="font-semibold">{bookedConfirmation.centerName}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Test: <span className="font-semibold">{bookedConfirmation.testName}</span>
        </p>
        <p className="text-gray-700 mb-6">
          Date: <span className="font-semibold">{bookedConfirmation.date}</span>
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
        <h2 className="text-2xl font-bold text-green-700 mb-4">{t.medicalTest.title}</h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

        {!selectedTest ? (
          <div>
            <p className="text-green-700 font-semibold mb-4">{t.medicalTest.selectTest}</p>
            <div className="grid gap-2">
              {tests.length > 0 ? (
                tests.map((test) => (
                  <Button
                    key={test.id}
                    onClick={() => handleTestSelect(test)}
                    className="bg-green-100 hover:bg-green-200 text-green-700 text-left p-4 h-auto justify-start"
                  >
                    <div className="text-left">
                      <p className="font-semibold">{test.name}</p>
                      <p className="text-sm">{test.category}</p>
                    </div>
                  </Button>
                ))
              ) : (
                <p className="text-gray-600">{loading ? "Loading tests..." : "No tests available"}</p>
              )}
            </div>
          </div>
        ) : !selectedCenter ? (
          <div>
            <p className="text-gray-700 mb-4">
              Selected Test: <span className="font-semibold text-green-700">{selectedTest.name}</span>
            </p>

            <p className="text-green-700 font-semibold mb-4">{t.medicalTest.selectLocation}</p>
            <div className="grid gap-2">
              {diagnosticCenters.length > 0 ? (
                diagnosticCenters.map((center) => (
                  <Button
                    key={center.id}
                    onClick={() => setSelectedCenter(center)}
                    className="bg-green-100 hover:bg-green-200 text-green-700 text-left p-4 h-auto justify-start"
                  >
                    <div className="text-left">
                      <p className="font-semibold">{center.name}</p>
                      <p className="text-sm">{center.address}</p>
                      <p className="text-xs text-gray-600">
                        ⏰ {center.opening_time} - {center.closing_time}
                      </p>
                    </div>
                  </Button>
                ))
              ) : (
                <p className="text-gray-600">{loading ? "Loading centers..." : "No diagnostic centers available"}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">
              Test: <span className="font-semibold">{selectedTest.name}</span>
            </p>
            <p className="text-gray-700">
              Center: <span className="font-semibold">{selectedCenter.name}</span>
            </p>
            <p className="text-sm text-gray-600">{selectedCenter.address}</p>
            <Button
              onClick={handleBookTest}
              className="bg-green-600 hover:bg-green-700 text-white w-full"
              disabled={loading}
            >
              {loading ? "Booking..." : t.medicalTest.bookTest}
            </Button>
          </div>
        )}

        {!selectedTest && (
          <Button onClick={onBack} className="bg-gray-600 hover:bg-gray-700 w-full mt-4">
            {t.profile.backToDashboard}
          </Button>
        )}
      </Card>
    </div>
  )
}
