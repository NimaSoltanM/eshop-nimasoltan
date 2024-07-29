import { db } from "@/server/db";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";

export default async function ProductPage() {
  const products = await db.query.products.findMany({});

  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
