import { SEARCH_ALL_VIDEOS } from "../config/search-types.js";
import { upsertLastSearchDate } from "./upsert-last-search-date.js";

export const upsertLastStoreAllVideosDate = async (date) =>
  upsertLastSearchDate(SEARCH_ALL_VIDEOS, date);
