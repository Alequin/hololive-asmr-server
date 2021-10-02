import { query } from "./database.js";

export const insertVideo = async ({
  videoId,
  channelTitle,
  videoTitle,
  thumbnailUrl,
}) =>
  query(
    `
    INSERT INTO videos (video_id, channel_title, video_title, thumbnail_url)
        VALUES ($1, $2, $3, $4);
    `,
    [videoId, channelTitle, videoTitle, thumbnailUrl]
  );
