import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";

export default function JobDetails() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();

      // Poll for job updates if status is ongoing
      const interval = setInterval(() => {
        if (job?.status === "ongoing") {
          fetchJobDetails();
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [jobId, job?.status]);

  const fetchJobDetails = async () => {
    try {
      const statusRes = await fetch(`/api/status?jobid=${jobId}`);

      if (!statusRes.ok) {
        setError("Job not found");
        setLoading(false);
        return;
      }

      const statusData = await statusRes.json();

      // Fetch results if job is completed
      if (statusData.status === "completed") {
        const resultsRes = await fetch(`/api/results?jobid=${jobId}`);

        if (resultsRes.ok) {
          const resultsData = await resultsRes.json();
          setJob(resultsData);
        } else {
          setJob(statusData);
        }
      } else {
        setJob(statusData);
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
      setError("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ongoing":
        return <Badge className="bg-yellow-500">Processing</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertDescription>{error || "Job not found"}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Job #{job.job_id}</h1>
          {getStatusBadge(job.status)}
        </div>
        <Button onClick={fetchJobDetails} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Job Status</CardTitle>
          <CardDescription>Current status: {job.status}</CardDescription>
        </CardHeader>
        <CardContent>
          {job.status === "failed" && job.error && (
            <Alert variant="destructive">
              <AlertDescription>
                <div className="font-medium mb-2">
                  Job processing failed with the following errors:
                </div>
                <ul className="list-disc pl-5">
                  {job.error.map((err: any, index: number) => (
                    <li key={index}>
                      Store ID: {err.store_id} - {err.error}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {job.status === "ongoing" && (
            <div className="flex items-center gap-2 text-yellow-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Job is currently processing...</span>
            </div>
          )}

          {job.status === "completed" && (
            <div className="text-green-500">Job completed successfully</div>
          )}
        </CardContent>
      </Card>

      {job.results && job.results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Results</CardTitle>
            <CardDescription>
              Processed {job.results.length} images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Store ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Perimeter
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {job.results.map((result: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.store_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <img
                          src={result.image_url || "/placeholder.svg"}
                          alt="Processed image"
                          className="h-12 w-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.perimeter} px
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
