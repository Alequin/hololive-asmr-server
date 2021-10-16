import { SEARCH_RECENT_VIDEOS } from "../config/search-types.js";
import { upsertLastSearchDate } from "./upsert-last-search-date.js";

export const upsertLastStoreRecentVideosDate = async (date) =>
  upsertLastSearchDate(SEARCH_RECENT_VIDEOS, date);
