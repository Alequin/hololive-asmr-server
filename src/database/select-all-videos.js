import { query } from "./database.js";

export const selectAllVideos = async () =>
  query(
    "SELECT video_id, channel_title, video_title, thumbnail_url, channel_id, published_at FROM videos;"
  );
