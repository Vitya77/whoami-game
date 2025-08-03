import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleDb } from "./useDrizzleDb";

export default function usePlayers(roomId: number) {
  const db = useDrizzleDb();
  const query = useLiveQuery(db.query.playersTable.findMany({
    where: (playersTable, { eq }) => {
      return eq(playersTable.roomId, roomId);
    },
  }));

  return { players: query.data.sort((a, b) => {
    return a.id - b.id;
  }), error: query.error }; 
}