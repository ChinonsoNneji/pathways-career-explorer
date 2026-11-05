import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const students = sqliteTable("students", {
  userId: text("user_id").primaryKey(),
  profile: text("profile").notNull(),
});
