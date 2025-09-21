import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    // Simulate a server-side error
    throw new Error("Test server-side error from Sentry test API");
  } catch (error) {
    // Capture the error with Sentry
    Sentry.captureException(error);
    
    // Return an error response
    return NextResponse.json(
      { error: "Server error occurred and was sent to Sentry" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Capture a custom message with context
    Sentry.captureMessage("Custom API message", {
      level: "info",
      extra: { requestBody: body },
    });
    
    return NextResponse.json({ message: "Custom message sent to Sentry" });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}