import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleDb } from "./useDrizzleDb";

export default function useRooms() {
  const db = useDrizzleDb();
  const query = useLiveQuery(db.query.roomsTable.findMany());

  return { rooms: query.data, error: query.error }; 
}