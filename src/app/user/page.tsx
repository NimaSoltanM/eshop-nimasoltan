import { getUser } from "@/lib/auth/lucia-helper";
import { redirect } from "next/navigation";

export default async function UserMainPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1>hello dear {user.username}</h1>
    </div>
  );
}
