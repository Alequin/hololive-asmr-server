import { query } from "../database.js";

export const selectAllSqlTableNames = async () =>
  (
    await query(`SELECT table_schema,table_name
  FROM information_schema.tables
  WHERE table_schema='public'
  ORDER BY table_schema,table_name;`)
  ).map(({ table_name }) => table_name);
