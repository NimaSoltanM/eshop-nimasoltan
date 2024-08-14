import type { AdminSpeedDialProps } from "./admin-speed-dial";
import { Plus } from "lucide-react"; // Import icons from lucide-react

export const admin_products_options: AdminSpeedDialProps = {
  options: [
    {
      label: "Add New Product",
      icon: <Plus className="h-5 w-5" />, // Example icon
      href: "/admin/products/new",
    },
  ],
};

export const admin_customers_options: AdminSpeedDialProps = {
  options: [
    {
      label: "Add New Product",
      icon: <Plus className="h-5 w-5" />, // Example icon
      href: "/admin/customers/new",
    },
  ],
};
