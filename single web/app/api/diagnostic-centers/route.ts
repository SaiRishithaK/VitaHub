// <CHANGE> Use Supabase instead of Neon and fix location filtering
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get("lat") || "28.6139")
    const lng = parseFloat(searchParams.get("lng") || "77.2090")

    console.log("[v0] Fetching diagnostic centers for location:", { lat, lng })

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

    // Fetch all diagnostic centers and calculate distance in client
    const { data, error } = await supabase
      .from("diagnostic_centers")
      .select("*")
      .limit(10)

    if (error) throw error

    // Calculate distances and sort
    const centersWithDistance = (data || []).map((center: any) => ({
      ...center,
      distance: Math.sqrt(
        Math.pow(center.latitude - lat, 2) + Math.pow(center.longitude - lng, 2)
      ),
    }))

    const sorted = centersWithDistance.sort((a: any, b: any) => a.distance - b.distance)

    console.log("[v0] Diagnostic centers fetched successfully:", sorted.length, "centers found")
    return Response.json(sorted)
  } catch (error) {
    console.error("[v0] Error fetching diagnostic centers:", error)
    return Response.json(
      { error: "Failed to fetch diagnostic centers", details: String(error) },
      { status: 500 },
    )
  }
}
