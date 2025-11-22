import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(request: NextRequest) {
  try {
    const { patientId, slotId, doctorId, appointmentDate } = await request.json()

    console.log("[v0] API: Booking appointment:", { patientId, slotId, doctorId, appointmentDate })

    // Get slot details
    const { data: slotData, error: slotError } = await supabase
      .from("appointment_slots")
      .select("id, start_time, end_time")
      .eq("id", slotId)
      .single()

    if (slotError || !slotData) {
      console.log("[v0] API: Slot not found:", slotId, slotError)
      return NextResponse.json({ error: "Slot not found" }, { status: 404 })
    }

    // <CHANGE> Check if slot is available and not already booked
    const { data: existingBooking, error: existingError } = await supabase
      .from("appointments")
      .select("id")
      .eq("slot_id", slotId)
      .eq("status", "booked")
      .maybeSingle()

    if (existingBooking) {
      console.log("[v0] API: Slot already booked")
      return NextResponse.json({ error: "Slot is no longer available" }, { status: 409 })
    }

    // <CHANGE> Create appointment using Supabase instead of Neon
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert([
        {
          doctor_id: doctorId,
          patient_id: patientId,
          slot_id: slotId,
          appointment_date: appointmentDate,
          start_time: slotData.start_time,
          end_time: slotData.end_time,
          status: "booked",
        },
      ])
      .select()
      .single()

    if (appointmentError || !appointment) {
      console.log("[v0] API: Error creating appointment:", appointmentError)
      return NextResponse.json(
        { error: "Failed to book appointment", details: appointmentError?.message },
        { status: 500 },
      )
    }

    console.log("[v0] API: Appointment created successfully:", appointment.id)
    return NextResponse.json(appointment)
  } catch (error) {
    console.error("[v0] API Error booking appointment:", error)
    return NextResponse.json(
      { error: "Failed to book appointment", details: String(error) },
      { status: 500 },
    )
  }
}
