import { query } from "./database.js";

export const upsertLastSearchDate = async (searchType, date) =>
  query(
    `INSERT INTO last_time_search_was_performed (search_type, last_search_date) VALUES ($1, $2)
        ON CONFLICT (search_type) DO 
        UPDATE SET last_search_date = $2;`,
    [searchType, date]
  );
