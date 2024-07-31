"use server";

import { db } from "@/server/db";
import { userTable } from "@/server/db/schema";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/resend/email-template";
import { eq } from "drizzle-orm";
import { generateEmailVerificationCode } from "@/lib/auth/email-helper";
import { getUser } from "@/lib/auth/lucia-helper";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const user = await getUser();

    if (!user || user.emailIsVerified) {
      return NextResponse.json(
        { error: "User not found or email already verified" },
        { status: 400 },
      );
    }

    const email = user.email;

    // Generate the verification code
    const verificationCode = await generateEmailVerificationCode(
      user.id,
      email,
    );

    // Send the verification code via email
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Your code verification",
      react: EmailTemplate({
        firstName: user.username,
        code: verificationCode,
      }),
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Verification email sent successfully", data },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
