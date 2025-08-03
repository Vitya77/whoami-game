import { useDrizzleDb } from "./useDrizzleDb";

export default function useWordsExceptPlayers(roomId: number) {
  const db = useDrizzleDb();

  return async (playerId: number) => {
    return await db.query.wordsTable.findMany({
      where: (wordsTable, { eq, and, not }) => {
        return and(
          eq(wordsTable.roomId, roomId),
          not(eq(wordsTable.creatorId, playerId))
        );
      }
    })
  }; 
}