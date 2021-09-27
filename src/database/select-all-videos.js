import { query } from "./database.js";

export const selectAllVideos = async () => query("SELECT * FROM videos;");
