import { getUser } from "@/lib/auth/lucia-helper";
import { db } from "@/server/db";
import VerifyEmail from "./verify-email";

export default async function VerifyEmailPage() {
  const user = await getUser();

  if (!user?.email) {
    return <h1>Error validating email, logout and login again</h1>;
  }

  return <VerifyEmail email={user?.email} />;
}
