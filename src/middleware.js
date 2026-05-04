import { NextResponse } from "next/server";

const PROTECTED = ["/my-profile", "/animals/"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get("better-auth.session_token");

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-profile/:path*", "/animals/:path*"],
};