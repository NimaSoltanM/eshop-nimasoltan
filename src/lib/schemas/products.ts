import { z } from "zod";

export const addProcuctSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  imageUrl: z.string(),
  stock: z.coerce.number(),
  price: z.coerce.number(),
  categoryId: z.coerce.number(),
});
