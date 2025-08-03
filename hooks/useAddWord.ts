import { wordsTable } from "@/db/schema";
import { useDrizzleDb } from "./useDrizzleDb";

export default function useAddWord(roomId: number, playerId: number) {
  const db = useDrizzleDb();

  return async (text: string) => {
    await db.insert(wordsTable).values({ text, roomId, creatorId: playerId }).run();
  };
}
