import {
  SEARCH_ALL_VIDEOS,
  SEARCH_CHANNELS,
  SEARCH_RECENT_VIDEOS,
} from "../../config/search-types.js";
import { logger } from "../../logger.js";
import { query } from "../database.js";

export const createDatabaseTables = async () => {
  logger.info("CREATE TABLE IF NOT EXISTS channels");
  await query(`
    CREATE TABLE IF NOT EXISTS channels (
        id SERIAL PRIMARY KEY,
        channel_id TEXT UNIQUE NOT NULL,
        channel_title TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL,
        upload_playlist_id TEXT NOT NULL
    )`);

  logger.info("CREATE TABLE IF NOT EXISTS videos");
  await query(`
    CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        video_id TEXT UNIQUE NOT NULL,
        channel_id TEXT NOT NULL,
        video_title TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL,
        published_at TEXT NOT NULL,
        CONSTRAINT fk_channel_id
          FOREIGN KEY(channel_id) 
            REFERENCES channels(channel_id)
    )`);

  logger.info("CREATE TABLE IF NOT EXISTS last_time_search_was_performed");
  await query(
    `CREATE TABLE IF NOT EXISTS last_time_search_was_performed (
        id SERIAL PRIMARY KEY,
        search_type TEXT UNIQUE CHECK (search_type IN ('${SEARCH_CHANNELS}', '${SEARCH_RECENT_VIDEOS}', '${SEARCH_ALL_VIDEOS}')),
        last_search_date TIMESTAMP NOT NULL
    )`
  );
};
