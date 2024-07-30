import { getUser } from "@/lib/auth/lucia-helper";
import EmailVerificationError from "./_components/email-verification-error";

export default async function UserMainPage() {
  const user = await getUser();

  const isVerified = user?.emailIsVerified;

  return (
    <div>
      {!isVerified ? <EmailVerificationError /> : null}
      <h1>hello dear {user?.username}</h1>
    </div>
  );
}
