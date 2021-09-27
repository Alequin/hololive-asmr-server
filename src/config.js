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

const currentEnvironment = process.env.NODE_ENV;

assert(
  currentEnvironment,
  'A value for the environment variable "NODE_ENV" must be provided'
);
assert(
  validEnvironmentOptions[currentEnvironment],
  `The given "NODE_ENV" is not one of the valid options / Given Env: ${currentEnvironment}, valid Options: ${JSON.stringify(
    Object.values(validEnvironmentOptions)
  )}`
);

const isEnvTest = () => currentEnvironment === validEnvironmentOptions.test;
const isEnvLocal = () => currentEnvironment === validEnvironmentOptions.local;
const isEnvProduction = () =>
  currentEnvironment === validEnvironmentOptions.production;
