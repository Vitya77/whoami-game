import { playersTable } from "@/db/schema";
import { useDrizzleDb } from "./useDrizzleDb";

export default function useAddPlayer(roomId: number) {
  const db = useDrizzleDb();

  return async (name: string) => {
    await db.insert(playersTable).values({ name, roomId }).run();
  };
}
