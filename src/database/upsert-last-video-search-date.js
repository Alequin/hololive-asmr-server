import { query } from "./database.js";

export const upsertLastVideoSearchDate = async (date) =>
  query(
    `
  INSERT INTO last_time_videos_were_searched VALUES (1, $1)
  ON CONFLICT (id) DO 
    UPDATE SET last_search_date = $1;
`,
    [date]
  );
