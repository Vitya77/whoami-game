import { roomsTable } from "@/db/schema";
import { useDrizzleDb } from "./useDrizzleDb";

export default function useAddRoom() {
  const db = useDrizzleDb();

  return async (name: string) => {
    await db.insert(roomsTable).values({ name }).run();
  };
}
