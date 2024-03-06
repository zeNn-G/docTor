import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

// export const db = drizzle(postgres(env.DATABASE_URL), { schema });

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  const client = postgres(env.DATABASE_URL);

  db = drizzle(client, {
    schema,
  });
} else {
  if (!global.db) {
    const client = postgres(env.DATABASE_URL);

    global.db = drizzle(client, {
      schema,
      // logger: {
      //   logQuery: (query) => {
      //     // to remove quotes on query string, to make it more readable
      //     console.log({ query: query.replace(/\"/g, "") });
      //   },
      // },
    });
  }

  db = global.db;
}

export { db };
