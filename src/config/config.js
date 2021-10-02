import { readJsonFile } from "../read-json-file.js";
import { validEnvironmentOptions } from "./valid-environment-options.js";
import { currentDatabaseName } from "./current-database-name.js";

export const getEnvironmentVariables = () => ({
  port: process.env.PORT || 3000,
  databaseName: currentDatabaseName(environmentCheckers),
  ...environmentCheckers,
  ...secretEnvironmentVariables,
  ...productionOnlySecretEnvironmentVariables,
});

const currentEnvironment =
  process.env.NODE_ENV || validEnvironmentOptions.local;

const environmentCheckers = {
  isEnvTest: () => currentEnvironment === validEnvironmentOptions.test,
  isEnvLocal: () => currentEnvironment === validEnvironmentOptions.local,
  isEnvProduction: () =>
    currentEnvironment === validEnvironmentOptions.production,
};

const secretEnvironmentVariables = {
  ...(!environmentCheckers.isEnvProduction()
    ? readJsonFile("./secrets.json")
    : undefined),
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
};

const productionOnlySecretEnvironmentVariables =
  environmentCheckers.isEnvProduction()
    ? {
        connectionString: process.env.DATABASE_URL,
      }
    : undefined;
