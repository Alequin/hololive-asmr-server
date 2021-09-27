import { readJsonFile } from "./read-json-file.js";

export const getEnvironmentVariables = () => {
  return {
    ...readJsonFile("./secrets.json"),
    isEnvTest,
    isEnvLocal,
    isEnvProduction,
  };
};

const validEnvironmentOptions = {
  test: "test",
  local: "local",
  production: "production",
};

const currentEnvironment =
  process.env.NODE_ENV || validEnvironmentOptions.local;

const isEnvTest = () => currentEnvironment === validEnvironmentOptions.test;
const isEnvLocal = () => currentEnvironment === validEnvironmentOptions.local;
const isEnvProduction = () =>
  currentEnvironment === validEnvironmentOptions.production;
