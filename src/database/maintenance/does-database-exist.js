import { query } from "../database.js";

export const doesDatabaseExist = async (databaseName) =>
  query("SELECT FROM pg_database WHERE datname=$1", [databaseName]).then(
    (foundDatabases) => foundDatabases.length > 0
  );
