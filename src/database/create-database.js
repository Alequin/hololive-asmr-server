import * as database from "./database.js";

export const createDatabase = async () =>
  database.command(`
    CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY,
        videoId TEXT NOT NULL,
        channelTitle TEXT NOT NULL,
        videoTitle TEXT NOT NULL,
        thumbnailUrl TEXT NOT NULL 
    )
`);
