"use server";

import { getUser } from "@/lib/auth/lucia-helper";
import { db } from "@/server/db";
import { carts, cartItems, products } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: number) {
  const user = await getUser();

  if (!user?.id) {
    return {
      error: "Sorry, you need to be logged in to add items to your cart.",
    };
  }

  // Find or create cart
  let cart = await db.query.carts.findFirst({
    where: eq(carts.userId, user.id),
  });

  if (!cart) {
    const [newCart] = await db
      .insert(carts)
      .values({
        userId: user.id,
      })
      .returning();
    cart = newCart;
  }

  // Check if product exists
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) {
    return { error: "Invalid product" };
  }

  if (!cart) {
    return { error: "Failed to create or retrieve cart" };
  }

  const existingItem = await db.query.cartItems.findFirst({
    where: and(
      eq(cartItems.cartId, cart.id), // Ensure cart.id is a string
      eq(cartItems.productId, productId),
    ),
  });

  if (existingItem) {
    await db
      .update(cartItems)
      .set({ quantity: existingItem.quantity + 1 })
      .where(eq(cartItems.id, existingItem.id));
  } else {
    // Create new item
    await db.insert(cartItems).values({
      cartId: cart.id, // Ensure cart.id is a string
      productId: productId,
      quantity: 1,
    });
  }

  revalidatePath("/cart");
  return { success: "added to cart" };
}
