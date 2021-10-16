import { SEARCH_RECENT_VIDEOS } from "../config/search-types.js";
import { selectLastStoreDate } from "./select-last-store-date.js";

export const selectLastStoreRecentVideosDate = async () =>
  selectLastStoreDate(SEARCH_RECENT_VIDEOS);
