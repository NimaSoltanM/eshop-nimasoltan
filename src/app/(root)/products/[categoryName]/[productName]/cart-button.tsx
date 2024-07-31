"use client";

import { addToCart } from "@/app/(root)/cart/_actions/cartActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

export default function CartButton({ id }: { id: number }) {
  const router = useRouter();

  return (
    <Button
      size="lg"
      onClick={() => {
        startTransition(async () => {
          const res = await addToCart(id);

          if (res.error) {
            toast.error(res.error);
          } else {
            toast.success(res.success, {
              action: {
                label: "View Cart",
                onClick: () => router.push("/cart"),
              },
            });
          }
        });
      }}
    >
      Add To Cart
    </Button>
  );
}
