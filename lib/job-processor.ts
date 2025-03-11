import { jobStore, type JobError } from "./job-store";
import { downloadImage } from "./image-processor";

export async function processJob(jobId: string, jobData: any) {
  try {
    const job = jobStore.get(jobId);

    if (!job) {
      console.error(`Job ${jobId} not found`);
      return;
    }

    const errors: JobError[] = [];

    for (const visit of jobData.visits) {
      const { store_id, image_url } = visit;

      for (const url of image_url) {
        try {
          const perimeter = await downloadImage(url);

          job.results.push({
            store_id,
            image_url: url,
            perimeter,
          });

          // Simulate GPU processing time (0.1 to 0.4 seconds)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.floor(Math.random() * 300) + 100)
          );
        } catch (error) {
          console.error(
            `Error processing image ${url} for store ${store_id}:`,
            error
          );

          // Add error to job
          errors.push({
            store_id,
            error: `Failed to process image: ${url}`,
          });
        }
      }
    }

    // Update job status
    if (errors.length > 0) {
      job.status = "failed";
      job.errors = errors;
    } else {
      job.status = "completed";
    }

    // Update job in store
    jobStore.set(jobId, job);
  } catch (error) {
    console.error(`Error processing job ${jobId}:`, error);

    // Mark job as failed
    const job = jobStore.get(jobId);
    if (job) {
      job.status = "failed";
      job.errors = [{ store_id: "unknown", error: "Internal server error" }];
      jobStore.set(jobId, job);
    }
  }
}
