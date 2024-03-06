import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  hashedPassword: text("hashed_password").notNull(),
});

export type User = typeof users.$inferSelect;

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
