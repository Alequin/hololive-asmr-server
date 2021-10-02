import { doesJsonFileExist, readJsonFile } from "../read-json-file.js";
import { validEnvironmentOptions } from "./valid-environment-options.js";
import { currentDatabaseName } from "./current-database-name.js";

export const getEnvironmentVariables = () => ({
  port: process.env.PORT || 3000,
  databaseName: currentDatabaseName(environmentCheckers),
  ...environmentCheckers,
  ...secretEnvironmentVariables,
});

const currentEnvironment =
  process.env.NODE_ENV || validEnvironmentOptions.local;

const environmentCheckers = {
  isEnvTest: () => currentEnvironment === validEnvironmentOptions.test,
  isEnvLocal: () => currentEnvironment === validEnvironmentOptions.local,
  isEnvProduction: () =>
    currentEnvironment === validEnvironmentOptions.production,
};

const localSecrets = doesJsonFileExist("./secrets.json")
  ? readJsonFile("./secrets.json")
  : undefined;

const secretEnvironmentVariables = {
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  connectionString: process.env.DATABASE_URL,
  ...localSecrets,
};
