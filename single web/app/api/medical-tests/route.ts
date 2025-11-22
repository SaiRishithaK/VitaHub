// <CHANGE> Use Supabase instead of Neon to match database
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET() {
  try {
    console.log("[v0] Fetching medical tests from Supabase")
    
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

    const { data, error } = await supabase
      .from("medical_tests")
      .select("*")
      .order("category", { ascending: true })

    if (error) throw error

    console.log("[v0] Medical tests fetched successfully:", data?.length || 0, "tests found")
    return Response.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching medical tests:", error)
    return Response.json(
      { error: "Failed to fetch medical tests", details: String(error) },
      { status: 500 },
    )
  }
}
