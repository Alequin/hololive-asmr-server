import { query } from "./database.js";

export const deleteVideosByChannelId = async (channelId) =>
  query("DELETE FROM videos WHERE channel_id=$1;", [channelId]);
