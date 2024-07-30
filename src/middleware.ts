import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./lib/auth/lucia-helper";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/users")) {
    try {
      const user = await getUser();

      if (!user) {
        return NextResponse.redirect(new URL("/auth/signup", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Error validating session:", error);
      return NextResponse.redirect(new URL("/auth/signup", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/users/:path*",
};
