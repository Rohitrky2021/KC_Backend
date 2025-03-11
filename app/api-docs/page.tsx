export default function ApiDocs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">API Documentation</h1>

      <div id="submit" className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Submit Job</h2>
        <p className="mb-4">
          Create a job to process the images collected from stores.
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Endpoint</h3>
          <p className="font-mono bg-gray-100 p-2 rounded">POST /api/submit</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Request Payload</h3>
          <pre className="font-mono bg-gray-100 p-4 rounded overflow-x-auto">
            {`{
  "count": 2,
  "visits": [
    {
      "store_id": "S00339218",
      "image_url": [
        "https://www.gstatic.com/webp/gallery/2.jpg",
        "https://www.gstatic.com/webp/gallery/3.jpg"
      ],
      "visit_time": "time of store visit"
    },
    {
      "store_id": "S01408764",
      "image_url": [
        "https://www.gstatic.com/webp/gallery/3.jpg"
      ],
      "visit_time": "time of store visit"
    }
  ]
}`}
          </pre>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">
            Success Response (201 CREATED)
          </h3>
          <pre className="font-mono bg-gray-100 p-4 rounded overflow-x-auto">
            {`{
  "job_id": 123
}`}
          </pre>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">
            Error Response (400 BAD REQUEST)
          </h3>
          <pre className="font-mono bg-gray-100 p-4 rounded overflow-x-auto">
            {`{
  "error": "Error message"
}`}
          </pre>
        </div>
      </div>

      <div id="status" className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">2. Get Job Status</h2>
        <p className="mb-4">Check the status of a submitted job.</p>

        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Endpoint</h3>
          <p className="font-mono bg-gray-100 p-2 rounded">
            GET /api/status?jobid=123
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">
            Success Response - Completed (200 OK)
          </h3>
          <pre className="font-mono bg-gray-100 p-4 rounded overflow-x-auto">
            {`{
  "status": "completed",
  "job_id": "123"
}`}
          </pre>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">
            Success Response - Failed (200 OK)
          </h3>
          <pre className="font-mono bg-gray-100 p-4 rounded overflow-x-auto">
            {`{
  "status": "failed",
  "job_id": "123",
  "error": [
    {
      "store_id": "S00339218",
      "error": "Error message"
    }
  ]
}`}
          </pre>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">
            Error Response (400 BAD REQUEST)
          </h3>
          <pre className="font-mono bg-gray-100 p-4 rounded overflow-x-auto">{`{}`}</pre>
        </div>
      </div>
    </div>
  );
}
