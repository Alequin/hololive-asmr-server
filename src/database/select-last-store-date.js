import { query } from "./database.js";

export const selectLastStoreDate = async (searchType) =>
  query("SELECT last_search_date FROM last_time_search_was_performed WHERE search_type=$1;", [
    searchType,
  ]).then((rows) => rows?.[0]?.last_search_date || null);
