import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm"; // Assuming you're using Drizzle ORM
import { lucia } from "./lib/auth/lucia";
import { db } from "./server/db";
import { userTable } from "./server/db/schema";

export async function middleware(request: NextRequest) {
  // Check if the path starts with /users
  if (request.nextUrl.pathname.startsWith("/users")) {
    // Get the session cookie
    const sessionId =
      request.cookies.get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      // No session, redirect to signup
      return NextResponse.redirect(new URL("/auth/signup", request.url));
    }

    try {
      // Validate the session
      const { session, user } = await lucia.validateSession(sessionId);

      if (!session) {
        // Invalid session, redirect to signup
        return NextResponse.redirect(new URL("/auth/signup", request.url));
      }

      // Optionally, you can fetch more user details from the database
      const dbUser = await db.query.userTable.findFirst({
        where: eq(userTable.id, session.userId),
        columns: {
          username: true,
          email: true,
          role: true,
        },
      });

      if (!dbUser) {
        // User not found in database, redirect to signup
        return NextResponse.redirect(new URL("/auth/signup", request.url));
      }

      // User is authenticated, allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      console.error("Error validating session:", error);
      // Error occurred, redirect to signup
      return NextResponse.redirect(new URL("/auth/signup", request.url));
    }
  }

  // For all other paths, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: "/users/:path*",
};
