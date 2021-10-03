import { query } from "./database.js";

export const insertVideo = async ({
  videoId,
  channelTitle,
  videoTitle,
  thumbnailUrl,
  channelId,
  publishedAt,
}) =>
  query(
    `
    INSERT INTO videos (video_id, channel_title, video_title, thumbnail_url, channel_id, published_at)
        VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [videoId, channelTitle, videoTitle, thumbnailUrl, channelId, publishedAt]
  );
