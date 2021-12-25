import assert from "assert";
import { doesJsonFileExist, readJsonFile } from "../read-json-file.js";
import { currentDatabaseName } from "./current-database-name.js";
import { validEnvironmentOptions } from "./valid-environment-options.js";

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
  serverAuthToken: process.env.AUTH_TOKEN,
  ...localSecrets,
};

assert(
  secretEnvironmentVariables.youtubeApiKey,
  "Error: no youtube API key has been provided in config.js"
);
assert(
  secretEnvironmentVariables.serverAuthToken,
  "Error: no server auth token has been provided in config.js"
);
if (environmentCheckers.isEnvProduction())
  assert(
    secretEnvironmentVariables.connectionString,
    "Error: no database connection string has been provided in config.js"
  );
