import {
  HeartIcon,
  HomeIcon,
  MapPin,
  MessageSquare,
  SettingsIcon,
  ShoppingCart,
} from "lucide-react";

export const user_links = [
  {
    name: "Home",
    icon: <HomeIcon className="h-4 w-4" />,
    href: "/user",
  },
  {
    name: "Orders",
    href: "/user/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    name: "Wishlist",
    href: "/user/wishlist",
    icon: <HeartIcon className="h-4 w-4" />,
  },
  {
    name: "Comments",
    href: "/user/comments",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    name: "Addresses",
    href: "/user/addresses",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    name: "Settings",
    href: "/user/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
  },
];
