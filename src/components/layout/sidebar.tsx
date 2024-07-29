"use client";

// import { Link } from "next-view-transitions";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Bell, Package2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Link {
  name: string;
  icon: React.ReactNode;
  href: string;
}

export default function SideBar({ links }: { links: Link[] }) {
  const pathName = usePathname();

  return (
    <div className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">E-Shop</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  {
                    "bg-secondary": pathName === link.href,
                  },
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
