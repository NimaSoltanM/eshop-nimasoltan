"use server";

import { signInSchema, signUpSchema } from "@/schemas/auth";
import { db } from "@/server/db";
import { userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { lucia } from "@/lib/auth/lucia";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export const signUpAction = async (values: z.infer<typeof signUpSchema>) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const validatedFields = signUpSchema.safeParse(values);

  if (validatedFields.error) {
    return { error: "invalid fields" };
  }

  const { username, email, password } = validatedFields.data;

  const userExists = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  if (userExists) {
    return { error: "user already exists" };
  }

  //use bcrypt to hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = generateIdFromEntropySize(10);

  await db.insert(userTable).values({
    id: userId,
    username,
    email,
    hashedPassword,
    role: "user",
  });

  try {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "failed to create session" };
  }
};

export const signInAction = async (values: z.infer<typeof signInSchema>) => {
  //add 5 sec delay
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const validatedFields = signInSchema.safeParse(values);

  if (validatedFields.error) {
    return { error: "invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  if (!user?.hashedPassword) {
    return { error: "invalid credentials" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    return { error: "invalid credentials" };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
