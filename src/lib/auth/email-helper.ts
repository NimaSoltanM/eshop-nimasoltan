"use server";

import { db } from "@/server/db";
import { userTable, verifyEmailTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/resend/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  // Delete existing verification codes for the user
  await db
    .delete(verifyEmailTokens)
    .where(eq(verifyEmailTokens.userId, userId));

  // Generate a new 6-digit code
  const code = generateRandomSixDigitCode();

  // Insert new verification code
  await db.insert(verifyEmailTokens).values({
    userId,
    token: code,
    tokenExpiresAt: createDate(new TimeSpan(15, "m")), // 15 minutes from now
  });

  // Update user's email
  await db
    .update(userTable)
    .set({ email: email })
    .where(eq(userTable.id, userId));

  return code;
}

// Helper function to generate a random 6-digit number
function generateRandomSixDigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
