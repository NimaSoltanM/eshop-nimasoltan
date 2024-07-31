import { db } from "@/server/db";
import { verifyEmailTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  //   await db.("verifyEmailTokens").where("user_id", "=", userId).deleteAll();
  await db
    .delete(verifyEmailTokens)
    .where(eq(verifyEmailTokens.userId, userId));

  //   const code = generateRandomString(8, alphabet("0-9"));
  //   await db.table("email_verification_code").insert({
  //     user_id: userId,
  //     email,
  //     code,
  //     expires_at: createDate(new TimeSpan(15, "m")), // 15 minutes
  //   });
  //   return code;
}
