import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Retail Pulse Image Processing Service</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Service Overview</h2>
        <p className="mb-4">
          This service processes images collected from retail stores. It calculates the perimeter of each image and
          simulates GPU processing time.
        </p>
        <p className="mb-4">The service can handle multiple concurrent jobs with thousands of images each.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Submit Job</h3>
            <p className="text-gray-700 mb-2">POST /api/submit</p>
            <Link href="/api-docs#submit" className="text-blue-600 hover:underline">
              View Documentation
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Get Job Status</h3>
            <p className="text-gray-700 mb-2">GET /api/status?jobid=123</p>
            <Link href="/api-docs#status" className="text-blue-600 hover:underline">
              View Documentation
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Test the Service</h2>
          <p className="mb-4">You can test the service by submitting a job with sample data and checking its status.</p>
          <Link href="/test" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
            Go to Test Page
          </Link>
        </div>
      </div>
    </div>
  )
}

