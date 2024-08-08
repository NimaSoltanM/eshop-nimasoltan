import MainNavbar from "@/components/layout/main-navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
}
