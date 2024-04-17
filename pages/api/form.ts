import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const client = createClient({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
  const body = getFormParams(req);
  const queue = await client.lpush("q", body);
  return new NextResponse(JSON.stringify({ length: queue, body: body }), {
    status: 200,
  });
}

function getFormParams(req: NextRequest) {
  const form = new Map();
  for (const [key, value] of req.nextUrl.searchParams) {
    form.set(key, value);
  }
  return JSON.stringify(Object.fromEntries(form));
}
