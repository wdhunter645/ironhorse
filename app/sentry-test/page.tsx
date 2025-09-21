"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";

export default function SentryTestPage() {
  const [error, setError] = useState<string>("");

  const triggerClientError = () => {
    try {
      throw new Error("Test client-side error from Sentry test page");
    } catch (err) {
      Sentry.captureException(err);
      setError("Client error triggered and sent to Sentry");
    }
  };

  const triggerServerError = async () => {
    try {
      const response = await fetch("/api/sentry-test");
      if (!response.ok) {
        throw new Error("Server error response");
      }
      setError("Server error triggered");
    } catch {
      setError("Error occurred while testing server error");
    }
  };

  const triggerCustomMessage = () => {
    Sentry.captureMessage("Custom message from Sentry test page", "info");
    setError("Custom message sent to Sentry");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white">
        <h1 className="text-3xl font-bold">Sentry Error Testing</h1>
        <p className="mt-2 opacity-90">
          Use these buttons to test Sentry error monitoring integration.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Error Testing Options</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={triggerClientError}
              className="rounded-xl bg-red-600 px-4 py-3 text-white font-medium hover:bg-red-700 transition-colors"
            >
              Trigger Client Error
            </button>
            
            <button
              onClick={triggerServerError}
              className="rounded-xl bg-orange-600 px-4 py-3 text-white font-medium hover:bg-orange-700 transition-colors"
            >
              Trigger Server Error
            </button>
            
            <button
              onClick={triggerCustomMessage}
              className="rounded-xl bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Send Custom Message
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
            <p className="text-green-800 font-medium">✅ {error}</p>
          </div>
        )}

        <div className="rounded-2xl border p-6 bg-slate-50">
          <h3 className="font-semibold mb-2">About This Test Page</h3>
          <p className="text-slate-600 text-sm">
            This page helps verify that Sentry error monitoring is working correctly.
            Errors and messages triggered here should appear in your Sentry dashboard.
            This page should only be used for testing purposes.
          </p>
        </div>
      </div>
    </div>
  );
}