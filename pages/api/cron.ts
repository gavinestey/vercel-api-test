import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const [elem, remaining] = await update();
  return new NextResponse(
    JSON.stringify({ elem: elem, remaining: remaining }),
    {
      status: 200,
    },
  );
}

async function update() {
  const client = createClient({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
  const res = await client.multi().lpop("q").llen("q").exec();
  return res;
}
