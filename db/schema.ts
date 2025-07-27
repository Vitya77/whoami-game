import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const wordsTable = sqliteTable("words_table", {
  id: int().primaryKey({ autoIncrement: true }),
  text: text().notNull(),
  roomId: int().notNull().references(() => roomsTable.id, { onDelete: 'cascade' }),
  creatorId: int().notNull().references(() => playersTable.id, { onDelete: 'cascade' }),
});

export const roomsTable = sqliteTable("rooms_table", {
  id : int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const playersTable = sqliteTable("players_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  roomId: int().notNull().references(() => roomsTable.id, { onDelete: 'cascade' }),
});
