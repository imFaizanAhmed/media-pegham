import { NextApiResponse } from "next";

// Using Edge runtime
export const config = {
    runtime: 'edge',
  };
  
  // The API handler function
  export default async function handler(req: NextApiResponse) {
    // Creating a ReadableStream
    const stream = new ReadableStream({
      start(controller) {
        // Streaming a simple text message
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode('1. Streaming data: Hello from the Edge!'));
        controller.enqueue(encoder.encode('2. Streaming data: Hello from the Edge!'));
        controller.enqueue(encoder.encode('3. Streaming data: Hello from the Edge!'));
        controller.enqueue(encoder.encode('4. Streaming data: Hello from the Edge!'));
        controller.enqueue(encoder.encode('5. Streaming data: Hello from the Edge!'));
        controller.enqueue(encoder.encode('6. Streaming data: Hello from the Edge!'));
        controller.close();
      },
    });
  
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }