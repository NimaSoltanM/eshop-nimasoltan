import { UsersColumns } from "@/components/columns/admin/user-columns";
import { DataTable } from "@/components/shared/data-table";
import { db } from "@/server/db";

export default async function UsersPage() {
  const user = await db.query.userTable.findMany();

  return <DataTable columns={UsersColumns} data={user} />;
}
