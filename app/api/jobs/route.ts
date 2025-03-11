import { type NextRequest, NextResponse } from "next/server";
import { jobStore } from "@/lib/job-store";

export async function GET(request: NextRequest) {
  try {
    // Convert Map to Array and sort by job ID (newest first)
    const jobs = Array.from(jobStore.values()).sort(
      (a, b) => Number.parseInt(b.id) - Number.parseInt(a.id)
    );

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
