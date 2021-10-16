import { query } from "./database.js";

export const upsertVideo = async ({ videoId, videoTitle, thumbnailUrl, channelId, publishedAt }) =>
  query(
    `
    INSERT INTO videos (video_id, video_title, thumbnail_url, channel_id, published_at)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (video_id)
    DO 
      UPDATE SET 
        video_title=EXCLUDED.video_title, 
        thumbnail_url=EXCLUDED.thumbnail_url, 
        channel_id=EXCLUDED.channel_id, 
        published_at=EXCLUDED.published_at;
    `,
    [videoId, videoTitle, thumbnailUrl, channelId, publishedAt]
  );
