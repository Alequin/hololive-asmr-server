import { query } from "./database.js";

export const insertVideo = async ({
  videoId,
  channelTitle,
  videoTitle,
  thumbnailUrl,
}) =>
  query(
    `
    INSERT INTO videos (videoId, channelTitle, videoTitle, thumbnailUrl)
        VALUES (?, ?, ?, ?);
    `,
    [videoId, channelTitle, videoTitle, thumbnailUrl]
  );
