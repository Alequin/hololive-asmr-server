import { query } from "./database.js";

export const selectLastStoreAllVideosDate = async () =>
  query("SELECT last_search_date FROM last_time_videos_were_searched WHERE id=1;").then(
    (rows) => rows?.[0]?.last_search_date || null
  );
