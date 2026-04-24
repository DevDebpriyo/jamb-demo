import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // You can optionally add secret validation here to prevent abuse
    // const secret = req.nextUrl.searchParams.get("secret");
    // if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    //   return new Response("Invalid secret", { status: 401 });
    // }

    // Clear the cache for all Sanity queries using the 'sanity' tag
    // defineLive() automatically tags all requests with "sanity"
    revalidateTag("sanity");
    
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
    });
  } catch (err: any) {
    console.error("Revalidation Error:", err);
    return new Response(err.message, { status: 500 });
  }
}
