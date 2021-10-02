import { readJsonFile } from "../read-json-file.js";
import { validEnvironmentOptions } from "./valid-environment-options.js";

export const getEnvironmentVariables = () => {
  return {
    ...readJsonFile("./secrets.json"),
    isEnvTest,
    isEnvLocal,
    isEnvProduction,
    port: process.env.PORT || 3000,
  };
};

const currentEnvironment =
  process.env.NODE_ENV || validEnvironmentOptions.local;

const isEnvTest = () => currentEnvironment === validEnvironmentOptions.test;
const isEnvLocal = () => currentEnvironment === validEnvironmentOptions.local;
const isEnvProduction = () =>
  currentEnvironment === validEnvironmentOptions.production;
