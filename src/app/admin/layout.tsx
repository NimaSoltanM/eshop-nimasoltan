import DashboardNavbar from "@/components/layout/dashboard-navbar";
import SideBar from "@/components/layout/sidebar";
import { getUser } from "@/lib/auth/lucia-helper";
import { admin_links } from "@/lib/constants/admin";
import { redirect } from "next/navigation";

type Props = { children: React.ReactNode };
export default async function AdminLayout({ children }: Props) {
  const user = await getUser();

  if (user?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <SideBar links={admin_links} />
      <div>
        <DashboardNavbar title="Admin dashborad" links={admin_links} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="rounded-lg border p-4 shadow-sm">{children}</div>
        </main>
      </div>
    </div>
  );
}
