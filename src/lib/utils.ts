import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugifyString = (value: string) => {
  return value.replace(/ /g, "-");
};

export const deSlugifyString = (value: string) => {
  return value.replace(/-/g, " ");
};

export const formatPrice = (price: number) => {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export function calculateTotalWithTaxAndShipping(
  items: { price: number; quantity: number }[],
) {
  const subTotal = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const tax = (5 / 100) * subTotal;
  const shipping = 2000;
  const total = subTotal + tax + shipping;

  return {
    subTotal: subTotal,
    tax: tax,
    shipping,
    total: total,
  };
}
