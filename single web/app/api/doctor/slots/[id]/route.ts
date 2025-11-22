import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const slotId = params.id

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

    const { error } = await supabase.from("appointment_slots").delete().eq("id", slotId)

    if (error) {
      console.error("Delete error:", error)
      return NextResponse.json({ message: "Failed to delete slot" }, { status: 400 })
    }

    return NextResponse.json({ message: "Slot deleted successfully" })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
