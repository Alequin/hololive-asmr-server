import * as database from "../src/database/database";
import { getEnvironmentVariables } from "../src/config/config";
import { createDatabaseTables } from "../src/database/maintenance/create-database-tables";
import { logger } from "../src/logger";
import { doesDatabaseExist } from "../src/database/maintenance/does-database-exist";
import { runScript } from "./run-script";

export const setupDatabase = async () => {
  const environment = getEnvironmentVariables();
  environment.isEnvProduction()
    ? await setupProductionDatabase(environment.databaseName)
    : await setupLocalDatabase(environment.databaseName);
};

const setupProductionDatabase = async (databaseName) => {
  logger.info(
    "You are creating the production database. Make sure the environment variable 'connectionString' is set of included in secrets.json"
  );
  return await createTablesInGivenDatabase(databaseName);
};

const setupLocalDatabase = async (databaseName) => {
  // Create a connection without a target database
  await database.connect();
  if (!(await doesDatabaseExist(databaseName))) {
    logger.info(`Database already exists / databaseName: ${databaseName}`);
    await database.query(`CREATE DATABASE ${databaseName}`);
  }
  // Disconnect the connection without a target database
  await database.disconnect();

  await createTablesInGivenDatabase(databaseName);
};

const createTablesInGivenDatabase = async (databaseName) => {
  await database.connect(databaseName);
  await createDatabaseTables();
  await database.disconnect();
};

if (require.main === module) {
  runScript("setupDatabase", setupDatabase);
}
