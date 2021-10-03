import { query } from "./database.js";

export const selectByVideoId = async (videoId) =>
  query("SELECT * FROM videos WHERE video_id=$1;", [videoId]);
