import DashboardNavbar from "@/components/layout/dashboard-navbar";
import Sidebar from "@/components/layout/sidebar";
import { user_links } from "@/lib/constants/user";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <Sidebar links={user_links} />
      <div>
        <DashboardNavbar links={user_links} title="User Dashboard" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="rounded-lg border p-4 shadow-sm">{children}</div>
        </main>
      </div>
    </div>
  );
}
