import { query } from "./database.js";

export const selectAllVideosWithChannelDetails = async () =>
  query(`
    SELECT 
      videos.video_id, videos.video_title, videos.thumbnail_url as video_thumbnail_url, videos.channel_id, videos.published_at,
      channels.channel_title, channels.thumbnail_url as channel_thumbnail_url
    FROM videos 
    INNER JOIN channels ON
      videos.channel_id = channels.channel_id;`);
