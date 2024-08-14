import { UsersColumns } from "@/components/columns/user-columns";
import { DataTable } from "@/components/shared/data-table";
import { db } from "@/server/db";
import AdminSpeedDial from "../_components/admin-speed-dial";
import { admin_customers_options } from "../_components/admin-speed-dial-options";

export default async function UsersPage() {
  const user = await db.query.userTable.findMany();

  return (
    <>
      <DataTable columns={UsersColumns} data={user} />

      <AdminSpeedDial options={admin_customers_options.options} />
    </>
  );
}
