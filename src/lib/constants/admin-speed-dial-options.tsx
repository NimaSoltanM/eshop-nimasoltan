import { Plus } from "lucide-react"; // Import icons from lucide-react

export const admin_products_options = [
  {
    label: "Add New Product", // Change 'label' to 'title'
    icon: <Plus className="h-5 w-5" />, // Keep the icon as is
    href: "/admin/products/new",
  },
];

export const admin_customers_options = [
  // Change 'options' to 'items'
  {
    label: "Add New Customer", // Change 'label' to 'title' and update text
    icon: <Plus className="h-5 w-5" />, // Keep the icon as is
    href: "/admin/customers/new",
  },
];
