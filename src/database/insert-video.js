import { query } from "./database.js";

export const upsertVideo = async ({
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
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (video_id)
    DO 
      UPDATE SET 
        channel_title = EXCLUDED.channel_title, 
        video_title=EXCLUDED.video_title, 
        thumbnail_url=EXCLUDED.thumbnail_url, 
        channel_id=EXCLUDED.channel_id, 
        published_at=EXCLUDED.published_at;
    `,
    [videoId, channelTitle, videoTitle, thumbnailUrl, channelId, publishedAt]
  );
