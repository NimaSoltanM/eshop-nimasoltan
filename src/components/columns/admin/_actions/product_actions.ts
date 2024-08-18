"use server";

import { isAdmin } from "@/lib/auth/lucia-helper";
import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const removeProductAction = async (id: number) => {
  if (await isAdmin()) {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");
    return { success: "product got removed successfully" };
  } else {
    return { error: "Unauthorized action" };
  }
};
