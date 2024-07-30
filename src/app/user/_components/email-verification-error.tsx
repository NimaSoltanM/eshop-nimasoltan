import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
export default function EmailVerificationError() {
  return (
    <Alert variant="destructive" className="mb-10">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        <p>
          Your <b>email</b> is <b>not verified</b>, you won&apos;t be able to do
          some actions.
        </p>
        <Link href="/user/setting/verify-email" className="underline">
          Verify Now
        </Link>
      </AlertDescription>
    </Alert>
  );
}
