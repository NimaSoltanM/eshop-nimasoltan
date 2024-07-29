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

export default async function Navbar() {
  const catgories = await db.query.categories.findMany();

  const user = await getUser();

  return (
    <header className="mb-4 flex h-20 w-full shrink-0 items-center border-b px-4 md:px-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">TechShop</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              className="flex w-full items-center py-2 text-lg font-semibold"
              href="/"
            >
              Home
            </Link>
            <NavigationMenuComp categories={catgories} />
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
              <LogoutMenuItem />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/auth/signup">Sign up/in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
