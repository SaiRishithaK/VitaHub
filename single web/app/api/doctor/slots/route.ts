import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get("doctorId")

    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
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
    })

    const { data, error } = await supabase
      .from("appointment_slots")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("day_of_week", { ascending: true })

    if (error) {
      console.error("Query error:", error)
      return NextResponse.json({ slots: [] })
    }

    const formattedSlots =
      data?.map((slot) => ({
        id: slot.id,
        dayOfWeek: slot.day_of_week,
        startTime: slot.start_time,
        endTime: slot.end_time,
        durationMinutes: slot.duration_minutes,
      })) || []

    return NextResponse.json({ slots: formattedSlots })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ slots: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { doctorId, dayOfWeek, startTime, endTime, durationMinutes } = await request.json()

    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
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
    })

    const { data, error } = await supabase
      .from("appointment_slots")
      .insert({
        doctor_id: doctorId,
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
        duration_minutes: durationMinutes,
      })
      .select()
      .single()

    if (error) {
      console.error("Insert error:", error)
      return NextResponse.json({ message: "Failed to create slot" }, { status: 400 })
    }

    return NextResponse.json({
      slot: {
        id: data.id,
        dayOfWeek: data.day_of_week,
        startTime: data.start_time,
        endTime: data.end_time,
        durationMinutes: data.duration_minutes,
      },
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
