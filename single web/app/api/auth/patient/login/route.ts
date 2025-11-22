import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

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

    const passwordHash = await hashPassword(password)

    // <CHANGE> First fetch user by email and role, then verify password in app
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("role", "patient")
      .maybeSingle() // Returns null if no match instead of throwing error

    if (userError) {
      console.error("[v0] Database query error:", userError)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    if (!userData) {
      console.error("[v0] User not found for email:", email)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password matches
    if (userData.password_hash !== passwordHash) {
      console.error("[v0] Password mismatch for user:", email)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

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
    console.error("Login error:", error)
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
