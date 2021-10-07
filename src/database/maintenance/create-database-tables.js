import { query } from "../database.js";

export const createDatabaseTables = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        video_id TEXT UNIQUE NOT NULL,
        channel_title TEXT NOT NULL,
        video_title TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL,
        channel_id TEXT NOT NULL,
        published_at TEXT NOT NULL
    )
`);

  await query(`
    CREATE TABLE IF NOT EXISTS last_time_videos_were_searched (
        id SERIAL PRIMARY KEY,
        last_search_date TIMESTAMP NOT NULL
    )
`);
};
