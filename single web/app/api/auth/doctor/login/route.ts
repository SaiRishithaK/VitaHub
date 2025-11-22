import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("[v0] Doctor login attempt - Email:", email)

    if (!email || !password) {
      console.log("[v0] Missing email or password")
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
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

    const passwordHash = await hashPassword(password)
    console.log("[v0] Searching for doctor with email:", email)

    // <CHANGE> First fetch user by email and role, then verify password in app
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("role", "doctor")
      .maybeSingle()

    if (userError) {
      console.error("[v0] Database query error:", userError)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    if (!userData) {
      console.log("[v0] Doctor not found for email:", email)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    console.log("[v0] Doctor found, verifying password")

    // Verify password matches
    if (userData.password_hash !== passwordHash) {
      console.log("[v0] Password mismatch for doctor:", email)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    console.log("[v0] Doctor login successful:", email)

    return NextResponse.json({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: "doctor",
      },
      token: "temp-token",
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
  }
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}
