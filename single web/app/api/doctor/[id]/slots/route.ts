// Add comprehensive error logging and fix response format
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const doctorId = params.id
    console.log("[v0] API: Fetching slots for doctor:", doctorId)

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
              })
            } catch (error) {
              console.error("Cookie setting error:", error)
            }
          },
        },
      }
    )

    const { data: slots, error: fetchError } = await supabase
      .from("appointment_slots")
      .select("id, doctor_id, day_of_week, start_time, end_time")
      .eq("doctor_id", doctorId)
      .eq("is_available", true)
      .order("day_of_week", { ascending: true })
      .order("start_time", { ascending: true })

    if (fetchError) {
      console.error("[v0] API Error fetching slots:", fetchError)
      return NextResponse.json([], { status: 500 })
    }

    console.log("[v0] API: Slots found:", slots?.length || 0)
    return NextResponse.json(slots || [])
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json([], { status: 500 })
  }
}
