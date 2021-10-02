import * as database from "../src/database/database";
import { getEnvironmentVariables } from "../src/config/config";
import { createDatabase } from "../src/database/maintenance/create-database";
import { logger } from "../src/logger";
import { doesDatabaseExist } from "../src/database/maintenance/does-database-exist";
import { runScript } from "./run-script";

runScript("setupDatabase", async () => {
  const environment = getEnvironmentVariables();
  if (!environment.isEnvProduction()) {
    // Create a connection without a target database
    await database.connect();
    await setUpDatabaseLocally(environment.databaseName);
    // Disconnect the connection without a target database
    await database.disconnect();
  }

  await database.connect(environment.databaseName);
  await createDatabase();
  await database.disconnect();
});

const setUpDatabaseLocally = async (newDatabaseName) => {
  if (await doesDatabaseExist(newDatabaseName)) {
    return logger.info(
      `Database already exists / databaseName: ${newDatabaseName}`
    );
  }

  await database.query(`CREATE DATABASE ${newDatabaseName}`);
};
