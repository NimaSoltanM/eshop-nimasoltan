import { relations, sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `eshop_${name}`);

// auth
export const userTable = createTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull(),
  emailIsVerified: int("email_is_verified", { mode: "boolean" }).default(false),
  email: text("email").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  role: text("role").notNull(),
});

export const sessionTable = createTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: int("expires_at").notNull(),
});

export const verifyEmailTokens = createTable("verify_email_tokens", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  token: text("token"),
  tokenExpiresAt: int("token_expires_at", { mode: "timestamp" }).notNull(),
});

// products
export const categories = createTable("category", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
  description: text("description", { length: 256 }),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export type Category = typeof categories.$inferSelect;

export const products = createTable("product", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
  description: text("description", { length: 256 }),
  imageUrl: text("image_url", { length: 256 }),
  stock: int("stock", { mode: "number" }),
  price: int("price", { mode: "number" }),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  categoryId: int("category_id").references(() => categories.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});

export type Product = typeof products.$inferSelect;

export type User = typeof userTable.$inferSelect;

// cart
export const carts = createTable("cart", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export type Cart = typeof carts.$inferSelect;

export const cartItems = createTable("cart_item", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  quantity: int("quantity", { mode: "number" }).notNull(),
  productId: int("product_id").references(() => products.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  cartId: int("cart_id").references(() => carts.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export type CartItem = typeof cartItems.$inferSelect;

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const cartRelations = relations(carts, ({ one, many }) => ({
  user: one(userTable, {
    fields: [carts.userId],
    references: [userTable.id],
  }),
  items: many(cartItems),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

//auth
export const userRelations = relations(userTable, ({ many }) => ({
  verifyEmailTokens: many(verifyEmailTokens),
}));

export const verifyEmailRelations = relations(verifyEmailTokens, ({ one }) => ({
  user: one(userTable, {
    fields: [verifyEmailTokens.userId],
    references: [userTable.id],
  }),
}));
