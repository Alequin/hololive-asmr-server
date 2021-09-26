import sqlite3 from "sqlite3";
import { open } from "sqlite";

const DB_CONFIG = {
  filename: "./database.db",
  driver: sqlite3.cached.Database,
};

export const getDatabaseConnection = (() => {
  const connection = open(DB_CONFIG);
  return async () => await connection;
})();
