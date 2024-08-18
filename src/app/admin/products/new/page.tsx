import { db } from "@/server/db";
import AddProcutForm from "./product-form";

export default async function AddProcutPage() {
  const categories = await db.query.categories.findMany();

  return <AddProcutForm categories={categories} />;
}
