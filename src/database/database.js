import { Pool } from "pg";
import { getEnvironmentVariables } from "../config/config";
import { logger } from "../logger";

const setupDatabaseInterface = () => {
  let pool = null;

  const connect = async (databaseName) => {
    try {
      pool = new Pool(databaseConfig(databaseName));
    } catch (error) {
      logger.error("Unable to connect to the database");
      throw error;
    }
  };

  const query = async (query, variables) => {
    if (!pool) throw new Error("Query Error: Client is not connected to database");

    try {
      const client = await pool.connect();
      const rows = await client.query(query, variables).then(({ rows }) => rows);
      client.release();

      return rows;
    } catch (error) {
      logger.error("Unable to call database query");
      throw error;
    }
  };

  const disconnect = async () => {
    if (!pool) throw new Error("Disconnect Error: Client is not connected to database");

    try {
      await pool.end();
      pool = null;
    } catch (error) {
      logger.error("Unable to end database pool");
      throw error;
    }
  };

  return {
    connect,
    query,
    disconnect,
  };
};

const databaseConfig = (databaseName) => {
  const environment = getEnvironmentVariables();
  if (environment.isEnvLocal() || environment.isEnvTest())
    return {
      database: databaseName,
      user: "user",
      host: "localhost",
      password: "password",
      port: 5438,
    };

  if (environment.isEnvProduction())
    return {
      connectionString: environment.connectionString,
      ssl: {
        sslmode: "require",
        rejectUnauthorized: false,
      },
    };
};

module.exports = setupDatabaseInterface();
