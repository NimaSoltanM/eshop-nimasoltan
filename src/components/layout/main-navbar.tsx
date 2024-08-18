import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavigationMenuComp } from "./navigation-menu-comp";
import { db } from "@/server/db";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "@/lib/auth/lucia-helper";
import LogoutMenuItem from "./logout-menu-item";
import {
  LayoutDashboardIcon,
  Menu,
  Mountain,
  MountainIcon,
  ShoppingCartIcon,
} from "lucide-react";

export default async function MainNavbar() {
  const catgories = await db.query.categories.findMany();

  const user = await getUser();
  return (
    <header className="mb-4 flex h-20 w-full shrink-0 items-center border-b px-4 md:px-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/">
            <Mountain className="h-6 w-6" />
            <span className="sr-only">TechShop</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="/"
            >
              Home
            </Link>
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="/about"
            >
              About
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-[150px]">
        <Link className="mr-6 hidden lg:flex" href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">TechShop</span>
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <nav className="hidden items-center gap-x-2 md:flex">
          <Button variant="ghost" asChild>
            <Link
              className="group mx-1 inline-flex h-9 w-max items-center justify-center rounded-md px-5"
              href="/"
            >
              Home
            </Link>
          </Button>

          <NavigationMenuComp categories={catgories} />
          <Button variant="ghost" asChild>
            <Link
              className="group mx-1 inline-flex h-9 w-max items-center justify-center rounded-md px-5"
              href="/about"
            >
              About
            </Link>
          </Button>
        </nav>
      </div>
      <div className="gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {user ? (
          <div className="flex items-center gap-x-4">
            {user.role === "admin" && (
              <Button variant="link" asChild className="max-sm:hidden">
                <Link href="/admin">
                  <LayoutDashboardIcon className="mr-2 h-4 w-4" /> Admin
                  Dashboard
                </Link>
              </Button>
            )}
            <Button variant="outline" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCartIcon size="1.2rem" />
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="capitalize">
                  {user?.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/user">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/setting">Setting</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutMenuItem />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button asChild>
            <Link href="/auth/signup">Sign up/in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
