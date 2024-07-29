"use server";

import { cookies } from "next/headers";
import { lucia } from "./lucia";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/server/db/schema";

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return null;
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return;
  }

  const dbUser = await db.query.userTable.findFirst({
    where: eq(userTable.id, session.userId),
    columns: {
      username: true,
      email: true,
      role: true,
    },
  });

  return dbUser;
};
