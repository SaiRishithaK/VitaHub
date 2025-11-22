"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, X } from "lucide-react"

interface Slot {
  id: string
  dayOfWeek: string
  startTime: string
  endTime: string
  durationMinutes: number
}

interface DoctorSlotManagerProps {
  doctorId: string
  language?: string
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const daysTranslated = {
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  es: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
  hi: ["सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार"],
}

const content = {
  en: {
    addSlot: "Add Appointment Slot",
    day: "Day",
    startTime: "Start Time",
    endTime: "End Time",
    duration: "Duration (minutes)",
    addButton: "Add Slot",
    yourSlots: "Your Available Slots",
    noSlots: "No slots added yet",
    loading: "Loading slots...",
  },
  es: {
    addSlot: "Agregar Franja de Cita",
    day: "Día",
    startTime: "Hora de Inicio",
    endTime: "Hora de Fin",
    duration: "Duración (minutos)",
    addButton: "Agregar Franja",
    yourSlots: "Tus Franjas Disponibles",
    noSlots: "Aún no hay franjas agregadas",
    loading: "Cargando franjas...",
  },
  hi: {
    addSlot: "नियुक्ति स्लॉट जोड़ें",
    day: "दिन",
    startTime: "शुरुआत का समय",
    endTime: "समाप्ति का समय",
    duration: "अवधि (मिनट)",
    addButton: "स्लॉट जोड़ें",
    yourSlots: "आपके उपलब्ध स्लॉट",
    noSlots: "अभी तक कोई स्लॉट नहीं जोड़ा गया",
    loading: "स्लॉट लोड किए जा रहे हैं...",
  },
}

export default function DoctorSlotManager({ doctorId, language = "en" }: DoctorSlotManagerProps) {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    durationMinutes: "30",
  })
  const { toast } = useToast()
  const t = content[language as keyof typeof content] || content.en
  const daysList = daysTranslated[language as keyof typeof daysTranslated] || daysTranslated.en

  useEffect(() => {
    fetchSlots()
  }, [doctorId])

  const fetchSlots = async () => {
    try {
      const response = await fetch(`/api/doctor/slots?doctorId=${doctorId}`)
      const data = await response.json()
      if (response.ok) {
        setSlots(data.slots || [])
      }
    } catch (error) {
      console.error("[v0] Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSlot = async () => {
    if (!newSlot.dayOfWeek || !newSlot.startTime || !newSlot.endTime) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/doctor/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId,
          dayOfWeek: newSlot.dayOfWeek,
          startTime: newSlot.startTime,
          endTime: newSlot.endTime,
          durationMinutes: Number.parseInt(newSlot.durationMinutes),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Slot added successfully",
        })
        setSlots([...slots, data.slot])
        setNewSlot({
          dayOfWeek: "Monday",
          startTime: "09:00",
          endTime: "10:00",
          durationMinutes: "30",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to add slot",
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

  const handleDeleteSlot = async (slotId: string) => {
    try {
      const response = await fetch(`/api/doctor/slots/${slotId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSlots(slots.filter((s) => s.id !== slotId))
        toast({
          title: "Success",
          description: "Slot deleted successfully",
        })
      }
    } catch (error) {
      console.error("[v0] Error:", error)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Add New Slot */}
      <Card className="bg-white border-green-300 p-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">{t.addSlot}</h3>

        <div className="space-y-4">
          <div>
            <Label className="text-gray-700">{t.day} *</Label>
            <Select value={newSlot.dayOfWeek} onValueChange={(val) => setNewSlot({ ...newSlot, dayOfWeek: val })}>
              <SelectTrigger className="border-green-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {days.map((day, idx) => (
                  <SelectItem key={day} value={day}>
                    {daysList[idx]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-700">{t.startTime} *</Label>
            <Input
              type="time"
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              className="border-green-300"
            />
          </div>

          <div>
            <Label className="text-gray-700">{t.endTime} *</Label>
            <Input
              type="time"
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              className="border-green-300"
            />
          </div>

          <div>
            <Label className="text-gray-700">{t.duration}</Label>
            <Input
              type="number"
              value={newSlot.durationMinutes}
              onChange={(e) => setNewSlot({ ...newSlot, durationMinutes: e.target.value })}
              className="border-green-300"
            />
          </div>

          <Button onClick={handleAddSlot} className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            {t.addButton}
          </Button>
        </div>
      </Card>

      {/* Slots List */}
      <Card className="bg-white border-green-300 p-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">{t.yourSlots}</h3>

        {loading ? (
          <p>{t.loading}</p>
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
                  <p className="font-semibold text-green-700">{slot.dayOfWeek}</p>
                  <p className="text-sm text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
                <Button
                  onClick={() => handleDeleteSlot(slot.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
