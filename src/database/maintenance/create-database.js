import { query } from "../database.js";

export const createDatabase = async () =>
  query(`
    CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        videoId TEXT UNIQUE NOT NULL,
        channelTitle TEXT NOT NULL,
        videoTitle TEXT NOT NULL,
        thumbnailUrl TEXT NOT NULL 
    )
`);
