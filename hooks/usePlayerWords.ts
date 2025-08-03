import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleDb } from "./useDrizzleDb";

export default function usePlayerWords(roomId: number, playerId: number) {
  const db = useDrizzleDb();
  const query = useLiveQuery(db.query.wordsTable.findMany({
    where: (wordsTable, { eq, and }) => {
      return and(
        eq(wordsTable.roomId, roomId),
        eq(wordsTable.creatorId, playerId)
      );
    }
  }));

  return { words: query.data, error: query.error }; 
}