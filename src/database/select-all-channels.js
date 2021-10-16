import { query } from "./database.js";

export const selectAllChannels = async () =>
  query("SELECT channel_id, channel_title, thumbnail_url, upload_playlist_id FROM channels;");
