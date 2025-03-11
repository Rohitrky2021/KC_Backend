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

    if (job.status === "failed") {
      return NextResponse.json(
        {
          status: "failed",
          job_id: jobId,
          error: job.errors,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: job.status,
        job_id: jobId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking job status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
