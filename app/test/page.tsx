"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TestPage() {
  const [jobId, setJobId] = useState<string>("");
  const [statusJobId, setStatusJobId] = useState<string>("");
  const [requestPayload, setRequestPayload] = useState<string>(`{
  "count": 2,
  "visits": [
    {
      "store_id": "RP00038",
      "image_url": [
        "https://www.gstatic.com/webp/gallery/2.jpg",
        "https://www.gstatic.com/webp/gallery/3.jpg"
      ],
      "visit_time": "2023-05-01T10:30:00Z"
    },
    {
      "store_id": "RP00039",
      "image_url": [
        "https://www.gstatic.com/webp/gallery/3.jpg"
      ],
      "visit_time": "2023-05-01T11:45:00Z"
    }
  ]
}`);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmitJob = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestPayload,
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));

      if (res.ok && data.job_id) {
        setJobId(data.job_id.toString());
      }
    } catch (err) {
      setError("Failed to submit job. Please check your payload format.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/status?jobid=${statusJobId}`);
      const data = await res.json();

      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError("Failed to check job status.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Test the Service</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit Job</CardTitle>
            <CardDescription>
              Submit a new job to process images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Request Payload
              </label>
              <Textarea
                value={requestPayload}
                onChange={(e) => setRequestPayload(e.target.value)}
                className="font-mono"
                rows={12}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmitJob}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Submitting..." : "Submit Job"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check Job Status</CardTitle>
            <CardDescription>
              Check the status of a submitted job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Job ID</label>
              <Input
                value={statusJobId || jobId}
                onChange={(e) => setStatusJobId(e.target.value)}
                placeholder="Enter job ID"
              />
            </div>
            {/* Image Preview Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Image Previews
              </label>
              <div className="flex space-x-4">
                {JSON.parse(requestPayload).visits.map(
                  (visit: any, index: any) =>
                    visit.image_url.map((url: any, idx: any) => (
                      <img
                        key={`${index}-${idx}`}
                        src={url}
                        alt={`Preview ${index}-${idx}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleCheckStatus}
              disabled={loading || !statusJobId}
              className="w-full"
            >
              {loading ? "Checking..." : "Check Status"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {response && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Response</h2>
          <pre className="font-mono bg-gray-100 p-4 rounded overflow-x-auto">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}
