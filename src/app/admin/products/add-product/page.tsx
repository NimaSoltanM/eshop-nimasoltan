import { db } from "@/server/db";
import AddProcutForm from "../../_components/addProcutForm";

export default async function AddProcutPage() {
  const categories = await db.query.categories.findMany();

  return <AddProcutForm categories={categories} />;
}
