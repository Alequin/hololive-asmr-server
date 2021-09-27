import { query } from "./database.js";

export const selectAllSqlTableNames = async () =>
  (await query(`SELECT name FROM sqlite_master WHERE type = "table"`)).map(
    ({ name }) => name
  );
