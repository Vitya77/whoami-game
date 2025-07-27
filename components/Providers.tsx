import { SQLiteProvider } from "expo-sqlite";
import { ReactNode } from "react";

export const DATABASE_NAME = "whoami";

type ProvidersProps = {
    children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
      //useSuspense
    >
      {children}
    </SQLiteProvider>
  );
}

export default Providers