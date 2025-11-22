// <CHANGE> Use Supabase instead of Neon to match database
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { patientId, testId, diagnosticCenterId, bookingDate, bookingTime } = await request.json()

    console.log("[v0] Booking medical test:", {
      patientId,
      testId,
      diagnosticCenterId,
      bookingDate,
    })

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll() {},
        },
      },
    )

    // Create test booking
    const { data, error } = await supabase
      .from("test_bookings")
      .insert({
        patient_id: patientId,
        test_id: testId,
        diagnostic_center_id: diagnosticCenterId,
        booking_date: bookingDate,
        booking_time: bookingTime || "09:00:00",
        status: "booked",
      })
      .select()
      .single()

    if (error) throw error

    console.log("[v0] Test booking created successfully:", data.id)
    return Response.json(data)
  } catch (error) {
    console.error("[v0] Error booking test:", error)
    return Response.json({ error: "Failed to book test", details: String(error) }, { status: 500 })
  }
}
