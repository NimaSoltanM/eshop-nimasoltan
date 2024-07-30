"use client";

import { addToCart } from "@/app/(root)/cart/_actions/cartActions";
import { Button } from "@/components/ui/button";
import { startTransition } from "react";
import { toast } from "sonner";

export default function CartButton({ id }: { id: number }) {
  return (
    <Button
      size="lg"
      onClick={() => {
        startTransition(async () => {
          const res = await addToCart(id);

          if (res.error) {
            toast.error(res.error);
          } else {
            toast.success(res.success);
          }
        });
      }}
    >
      Add To Cart
    </Button>
  );
}
