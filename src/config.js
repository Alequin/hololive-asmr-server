import { readJsonFile } from "./read-json-file.js";

export const getEnvironmentVariables = () => {
  return {
    ...readJsonFile("./secrets.json"),
  };
};
