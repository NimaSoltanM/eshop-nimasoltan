import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/user")) {
    const sessionId = cookies().get("e-shop-cookie")?.value ?? null;

    if (!sessionId) {
      return NextResponse.redirect(new URL("/auth/signup", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/user/:path*",
};
