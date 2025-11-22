// <CHANGE> Switch from Neon to Supabase to match auth system
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] API: Fetching doctors list")

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

    // <CHANGE> Query doctors from Supabase with proper join
    const { data: doctors, error: fetchError } = await supabase
      .from("users")
      .select(
        `
        id,
        name,
        email,
        doctor_details (
          specialization
        )
      `
      )
      .eq("role", "doctor")

    if (fetchError) {
      console.error("[v0] API Error fetching doctors:", fetchError)
      return NextResponse.json({ error: "Failed to fetch doctors", details: fetchError.message }, { status: 500 })
    }

    console.log("[v0] API: Doctors found:", doctors?.length || 0)

    // <CHANGE> Format response to include specialization from nested object
    const formattedDoctors = doctors?.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      specialization: doc.doctor_details?.[0]?.specialization || "General Physician",
    })) || []

    return NextResponse.json(formattedDoctors)
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Failed to fetch doctors", details: String(error) }, { status: 500 })
  }
}
