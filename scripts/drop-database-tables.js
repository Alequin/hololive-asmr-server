import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { dropAllDatabaseTables } from "../src/database/maintenance/drop-all-database-tables";
import { runScript } from "./run-script";

runScript("dropAllDatabaseTables", async () => {
  const environment = getEnvironmentVariables();
  await database.connect(environment.databaseName);
  await dropAllDatabaseTables();
  await database.disconnect();
});
