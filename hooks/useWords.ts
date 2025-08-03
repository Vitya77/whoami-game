import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleDb } from "./useDrizzleDb";

export default function useWords(roomId: number) {
  const db = useDrizzleDb();
  const query = useLiveQuery(db.query.wordsTable.findMany({
    where: (wordsTable, { eq, and }) => {
      return and(
        eq(wordsTable.roomId, roomId),
      );
    }
  }));

  return { words: query.data, error: query.error }; 
}