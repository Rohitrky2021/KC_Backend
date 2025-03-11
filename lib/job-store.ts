export interface JobError {
  store_id: string;
  error: string;
}

export interface Job {
  id: string;
  status: "ongoing" | "completed" | "failed";
  data: any;
  results: Array<{
    store_id: string;
    image_url: string;
    perimeter: number;
  }>;
  errors: JobError[];
}

// Map to store jobs
export const jobStore = new Map<string, Job>();
