import { getDatabaseConnection } from "./database-connection.js";

/**
 * Call a single SQL query and return the result
 * @param {String} sqlCommand - The SQL query to call
 * @param {Array<any>} params - The list of params to use in the given SQL query
 * @returns Identified table rows
 */
export const query = async (sqlCommand, params) =>
  (await getDatabaseConnection()).all(sqlCommand, params);

/**
 * Calls one or more SQL statements at once. Returns no results
 * @param {String} sqlCommand - The SQL statements to call
 */
export const command = async (sqlCommand) =>
  (await getDatabaseConnection()).exec(sqlCommand);
