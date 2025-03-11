import { type NextRequest, NextResponse } from "next/server";
import { jobStore } from "@/lib/job-store";

export async function GET(request: NextRequest) {
  try {
    const jobId = request.nextUrl.searchParams.get("jobid");

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const job = jobStore.get(jobId);

    if (!job) {
      return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json(
      {
        job_id: jobId,
        status: job.status,
        results: job.results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching job results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
