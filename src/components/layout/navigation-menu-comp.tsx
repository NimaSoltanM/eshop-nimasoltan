"use client";

import * as React from "react";
import Link from "next/link";

import { cn, deSlugifyString, slugifyString } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Category } from "@/server/db/schema";

const categories = [
  {
    title: "Smart Phones",
    href: "/products/smart-phones",
    description:
      "Explore the latest and greatest in mobile technology. From flagship models to budget-friendly options, find the perfect smartphone for you.",
  },
  {
    title: "Laptops",
    href: "/products/laptops",
    description:
      "Discover our range of laptops, perfect for work, gaming, and everything in between. Sleek designs and powerful performance await.",
  },
  {
    title: "Gaming Consoles",
    href: "/products/gaming-consoles",
    description:
      "Dive into the world of gaming with our top-of-the-line consoles. Experience immersive gameplay and cutting-edge graphics.",
  },
];

export function NavigationMenuComp({ categories }: { categories: Category[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
              {categories.map((category) => (
                <ListItem
                  className="capitalize"
                  key={category.id}
                  title={category.name!}
                  href={`/products/${slugifyString(category.name!)}`}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
