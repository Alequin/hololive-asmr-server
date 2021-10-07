import { query } from "./database.js";

export const selectLastVideoSearchDate = async () =>
  query("SELECT last_search_date FROM last_time_videos_were_searched;").then(
    (rows) => rows?.[0]?.last_search_date || null
  );
