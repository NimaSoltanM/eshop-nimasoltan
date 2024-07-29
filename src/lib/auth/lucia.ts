import { db } from "@/server/db";
import { sessionTable, userTable } from "@/server/db/schema";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "e-shop-cookie",
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
