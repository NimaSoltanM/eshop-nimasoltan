import { getUser } from "@/lib/auth/lucia-helper";
import VerifyEmail from "./verify-email";

export default async function VerifyEmailPage() {
  const user = await getUser();

  if (!user?.email) {
    return <h1>Error validating email, logout and login again</h1>;
  }

  if (user.emailIsVerified) {
    return <h1>Your email is verified</h1>;
  }

  return <VerifyEmail email={user?.email} />;
}
