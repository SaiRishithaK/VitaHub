import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    console.log("[v0] Patient signup attempt - Email:", email)

    // <CHANGE> Validate required fields
    if (!name || !email || !phone || !password) {
      console.log("[v0] Missing required fields for patient signup")
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

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

    // <CHANGE> Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).maybeSingle()

    if (existingUser) {
      console.log("[v0] Patient already exists with email:", email)
      return NextResponse.json({ message: "Email already registered" }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    // <CHANGE> Insert user with all required fields
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        name,
        email,
        phone_number: phone,
        password_hash: passwordHash,
        role: "patient",
      })
      .select()
      .single()

    if (userError) {
      console.error("[v0] Patient creation error:", userError)
      return NextResponse.json({ message: "Failed to create user: " + userError.message }, { status: 400 })
    }

    console.log("[v0] Patient created successfully - ID:", userData.id)
    console.log("[v0] Patient signup completed for:", email)

    return NextResponse.json({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: "patient",
      },
      token: "temp-token",
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ message: "An error occurred during signup" }, { status: 500 })
  }
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}
