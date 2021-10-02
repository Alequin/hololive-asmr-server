import * as database from "../database.js";
import { selectAllSqlTableNames } from "./select-all-sql-table-names.js";

export const dropAllDatabaseTables = async () => {
  for (const tableName of await selectAllSqlTableNames())
    await database.query(`DROP TABLE IF EXISTS ${tableName};`);
};
