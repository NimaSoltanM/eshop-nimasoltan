import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sidebar";
import { admin_links } from "@/constants/admin";

type Props = { children: React.ReactNode };
export default function AdminLayout({ children }: Props) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <SideBar links={admin_links} />
      <div>
        <Header title="Admin dashborad" links={admin_links} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="rounded-lg border p-4 shadow-sm">{children}</div>
        </main>
      </div>
    </div>
  );
}
