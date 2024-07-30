"use server";

import { cookies } from "next/headers";
import { lucia } from "./lucia";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { carts, userTable } from "@/server/db/schema";
import { redirect } from "next/navigation";

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
      id: true,
      username: true,
      email: true,
      role: true,
      emailIsVerified: true,
    },
  });

  return dbUser;
};

export const getUserMetadata = async (options: { includeCart?: boolean }) => {
  const basicUser = await getUser();

  if (!basicUser) {
    return null;
  }

  if (options.includeCart) {
    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, basicUser.id),
      with: { items: { with: { product: true } } },
    });

    return cart;
  }
};

export const logOut = () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/auth");
};
