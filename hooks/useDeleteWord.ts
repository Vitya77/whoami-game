import { wordsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useDrizzleDb } from "./useDrizzleDb";

export default function useDeleteWord() {
  const db = useDrizzleDb();

  return async (wordId: number) => {
    await db.delete(wordsTable).where(eq(wordsTable.id, wordId)).run();
  };
}
