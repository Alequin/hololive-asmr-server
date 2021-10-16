import { query } from "./database.js";

export const upsertChannel = async ({ channelId, channelTitle, thumbnailUrl, uploadPlaylistId }) =>
  query(
    `
    INSERT INTO channels (channel_id, channel_title, thumbnail_url, upload_playlist_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (channel_id)
    DO 
      UPDATE SET 
        channel_id = EXCLUDED.channel_id, 
        channel_title=EXCLUDED.channel_title, 
        thumbnail_url=EXCLUDED.thumbnail_url, 
        upload_playlist_id=EXCLUDED.upload_playlist_id
    `,
    [channelId, channelTitle, thumbnailUrl, uploadPlaylistId]
  );
