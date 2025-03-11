import { type NextRequest, NextResponse } from "next/server";
import { processJob } from "@/lib/job-processor";
import { validateStoreIds } from "@/lib/store-validator";
import { jobStore } from "@/lib/job-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.count || !body.visits || !Array.isArray(body.visits)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    if (body.count !== body.visits.length) {
      return NextResponse.json(
        {
          error: "Count does not match the number of visits",
        },
        { status: 400 }
      );
    }

    for (const visit of body.visits) {
      if (
        !visit.store_id ||
        !visit.image_url ||
        !Array.isArray(visit.image_url)
      ) {
        return NextResponse.json(
          {
            error: "Each visit must have store_id and image_url array",
          },
          { status: 400 }
        );
      }
    }

    const storeIds = body.visits.map((visit: any) => visit.store_id);
    const invalidStores = validateStoreIds(storeIds);

    if (invalidStores.length > 0) {
      return NextResponse.json(
        {
          status: "failed",
          error: invalidStores.map((storeId) => ({
            store_id: storeId,
            error: "Store ID does not exist",
          })),
        },
        { status: 200 }
      );
    }

    // Create a new job
    const jobId = Date.now().toString();

    // Store job in memory
    jobStore.set(jobId, {
      id: jobId,
      status: "ongoing",
      data: body,
      results: [],
      errors: [],
    });

    // Process job asynchronously
    processJob(jobId, body).catch(console.error);

    return NextResponse.json({ job_id: jobId }, { status: 201 });
  } catch (error) {
    console.error("Error submitting job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
