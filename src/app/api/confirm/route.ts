// /api/confirm/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { userTable, verifyEmailTokens } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { getUser } from "@/lib/auth/lucia-helper";
import { isWithinExpirationDate } from "oslo";
import { lucia } from "@/lib/auth/lucia";

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code } = await request.json();
    if (typeof code !== "string") {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    const validCode = await verifyVerificationCode(user.id, code);
    if (!validCode) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 },
      );
    }

    // Invalidate all user sessions
    await lucia.invalidateUserSessions(user.id);

    // Update user's email verification status
    await db
      .update(userTable)
      .set({ emailIsVerified: true })
      .where(eq(userTable.id, user.id));

    // Create a new session
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return NextResponse.json(
      { message: "Email verified successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": sessionCookie.serialize(),
        },
      },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function verifyVerificationCode(
  userId: string,
  code: string,
): Promise<boolean> {
  const databaseCode = await db
    .select()
    .from(verifyEmailTokens)
    .where(eq(verifyEmailTokens.userId, userId))
    .get();

  if (!databaseCode || databaseCode.token !== code) {
    return false;
  }

  // Delete the verification code
  await db
    .delete(verifyEmailTokens)
    .where(eq(verifyEmailTokens.id, databaseCode.id));

  if (!isWithinExpirationDate(databaseCode.tokenExpiresAt)) {
    return false;
  }

  return true;
}
