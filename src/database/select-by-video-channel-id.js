import { query } from "./database.js";

export const selectVideosByChannelId = async (channelId) =>
  query("SELECT * FROM videos WHERE channel_id=$1;", [channelId]);
