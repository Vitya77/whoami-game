import Providers, { DATABASE_NAME } from "@/components/Providers";
import * as schema from "@/db/schema";
import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { openDatabaseSync } from "expo-sqlite";
import { useEffect } from "react";

export const expoDb = openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expoDb, { schema });

export default function RootLayout() {
  
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

  useEffect(() => {
    if (success) {
      console.log("Migrations completed successfully!");
    }
    else {
      console.log(`Migrations failed with error: ${error}`);
    }
  }, [success]);

  return (
    <Providers>
      <Stack />
    </Providers>
  );
}
