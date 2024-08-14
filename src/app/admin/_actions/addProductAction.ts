"use server";

import { slugifyString } from "@/lib/utils";
import { addProcuctSchema } from "@/lib/schemas/products";
import { db } from "@/server/db";
import { categories, products } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUser } from "@/lib/auth/lucia-helper";

export const addProductAction = async (
  values: z.infer<typeof addProcuctSchema>,
) => {
  const user = await getUser();

  if (user?.role !== "admin") {
    return { error: "unauthorized" };
  }

  const validatedFields = addProcuctSchema.safeParse(values);

  if (validatedFields.error) {
    return { error: "invalid fields" };
  }

  const { name, description, imageUrl, stock, price, categoryId } =
    validatedFields.data;

  await db.insert(products).values({
    name,
    description,
    imageUrl,
    stock,
    price: price * 100,
    categoryId,
  });

  const category = await db.query.categories.findFirst({
    where: eq(categories.id, categoryId),
  });

  revalidatePath("/products");
  redirect(`/products/${slugifyString(category?.name ?? "/products")}`);
};
