import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

export const userTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
