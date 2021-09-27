import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { getEnvironmentVariables } from "../config.js";

const { isEnvTest } = getEnvironmentVariables();

const DB_CONFIG = {
  filename: isEnvTest() ? "test-database.db" : "./database.db",
  driver: sqlite3.cached.Database,
};

export const getDatabaseConnection = (() => {
  const connection = open(DB_CONFIG);
  return async () => await connection;
})();
