import * as database from "./database.js";

(async () => {
  database.command(`
    CREATE TABLE videos (
        id INTEGER PRIMARY KEY,
        videoId TEXT NOT NULL,
        channelTitle TEXT NOT NULL,
        videoTitle TEXT NOT NULL,
        thumbnailUrl TEXT NOT NULL 
    )
  `);
})();
