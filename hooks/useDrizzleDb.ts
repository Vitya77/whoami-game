import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

export function useDrizzleDb() {
  const sqliteDb = useSQLiteContext();
  return drizzle(sqliteDb, { schema });
}
