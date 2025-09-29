import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, ts: Date.now(), env: process.env.NODE_ENV });
}
