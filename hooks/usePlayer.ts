import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleDb } from "./useDrizzleDb";

export default function usePlayer(roomId: number, playerId: number) {
  const db = useDrizzleDb();
  const query = useLiveQuery(db.query.playersTable.findFirst({
    where: (playersTable, { eq, and }) =>
      and(
        eq(playersTable.roomId, roomId),
        eq(playersTable.id, playerId)
      ),
  }));

  return { player: query.data, error: query.error }; 
}