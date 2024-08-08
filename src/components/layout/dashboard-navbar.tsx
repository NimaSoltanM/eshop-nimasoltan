import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import BreadCrumpComp from "../shared/bread-crump-comp";
import { getUser } from "@/lib/auth/lucia-helper";

interface NavLink {
  name: string;
  href: string;
  icon?: ReactNode;
}

interface HeaderProps {
  links: NavLink[];
  rightContent?: ReactNode;
  title: string;
}

export default async function DashboardNavbar({ links }: HeaderProps) {
  const user = await getUser();

  return (
    <header className="flex h-14 items-center justify-around gap-4 border-b px-5 lg:h-[60px]">
      <BreadCrumpComp />
      <div className="flex h-14 items-center gap-4 border-b lg:h-[60px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">TechShop</span>
            </Link>
            <div className="grid gap-2 py-6">
              {links.map((link, index) => (
                <Link
                  key={index}
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href={link.href}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.name}
                </Link>
              ))}
              <Link
                className="mt-10 flex w-full items-center py-2 text-lg font-semibold"
                href="/profile/orders"
              >
                Logout
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="capitalize">
              {user?.username}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
