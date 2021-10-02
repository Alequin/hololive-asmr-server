import { query } from "./database.js";

export const selectAllSqlTableNames = async () =>
  (
    await query(`SELECT table_schema,table_name
  FROM information_schema.tables
  ORDER BY table_schema,table_name;`)
  ).map(({ name }) => name);
