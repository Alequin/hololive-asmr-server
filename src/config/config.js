import { readJsonFile } from "../read-json-file.js";
import { validEnvironmentOptions } from "./valid-environment-options.js";

export const getEnvironmentVariables = () => ({
  ...secretEnvironmentVariables,
  port: process.env.PORT || 3000,
  isEnvTest,
  isEnvLocal,
  isEnvProduction,
});

const currentEnvironment =
  process.env.NODE_ENV || validEnvironmentOptions.local;

const isEnvTest = () => currentEnvironment === validEnvironmentOptions.test;
const isEnvLocal = () => currentEnvironment === validEnvironmentOptions.local;
const isEnvProduction = () =>
  currentEnvironment === validEnvironmentOptions.production;

const secretEnvironmentVariables = {
  ...(!isEnvProduction() ? readJsonFile("./secrets.json") : undefined),
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
};
