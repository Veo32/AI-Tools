import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  if (body.path) revalidatePath(body.path);
  if (body.tag) revalidateTag(body.tag);
  return NextResponse.json({ ok: true, revalidated: body.path ?? body.tag ?? "none" });
}

