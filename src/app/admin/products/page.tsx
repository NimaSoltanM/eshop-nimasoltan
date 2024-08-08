import { db } from "@/server/db";
import { DataTable } from "@/components/shared/data-table";
import { ProductColums } from "@/components/columns/product-columns";

export default async function ProductPage() {
  const products = await db.query.products.findMany({});

  return <DataTable columns={ProductColums} data={products} />;
}
