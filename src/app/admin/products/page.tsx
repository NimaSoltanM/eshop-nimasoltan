import { db } from "@/server/db";
import { DataTable } from "../_components/data-table/admin/products/data-table";
import { columns } from "../_components/data-table/admin/products/columns";

export default async function ProductPage() {
  const products = await db.query.products.findMany({});

  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
