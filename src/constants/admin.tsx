import {
  HomeIcon,
  PackageIcon,
  ShoppingCartIcon,
  Users2Icon,
} from "lucide-react";

interface Link {
  name: string;
  icon: JSX.Element;
  href: string;
  count?: number;
}

export const admin_links: Link[] = [
  {
    name: "Home",
    icon: <HomeIcon className="h-4 w-4" />,
    href: "/admin",
  },
  {
    name: "Orders",
    icon: <ShoppingCartIcon className="h-4 w-4" />,
    href: "/admin/orders",
  },
  {
    name: "Products",
    icon: <PackageIcon className="h-4 w-4" />,
    href: "/admin/products",
  },
  {
    name: "Customers",
    icon: <Users2Icon className="h-4 w-4" />,
    href: "/admin/customers",
  },
];
