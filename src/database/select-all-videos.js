import { query } from "./database.js";

export const selectAllVideos = async () =>
  query("SELECT video_id, video_title, thumbnail_url, channel_id, published_at FROM videos;");
