import { NextRequest, NextResponse } from "next/server";

const BETA_COOKIE_NAME = "besma_beta";
const BETA_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7일

export async function POST(request: NextRequest) {
  const passcode = process.env.BETA_PASSCODE;
  if (!passcode) {
    return NextResponse.json(
      { error: "Beta access is not configured." },
      { status: 503 }
    );
  }

  let body: { passcode?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const submitted = typeof body.passcode === "string" ? body.passcode : "";

  if (submitted !== passcode) {
    return NextResponse.json(
      { error: "패스코드가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(BETA_COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: BETA_COOKIE_MAX_AGE,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
