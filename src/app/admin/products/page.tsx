import { db } from "@/server/db";
import { DataTable } from "@/components/shared/data-table";
import { ProductColums } from "@/components/columns/admin/products/product-columns";
import AdminSpeedDial from "../_components/admin-speed-dial";
import { admin_products_options } from "@/lib/constants/admin-speed-dial-options";

export default async function ProductPage() {
  const products = await db.query.products.findMany({});

  return (
    <>
      <DataTable columns={ProductColums} data={products} />

      <AdminSpeedDial options={admin_products_options} />
    </>
  );
}
