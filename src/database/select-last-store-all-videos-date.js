import { SEARCH_ALL_VIDEOS } from "../config/search-types.js";
import { selectLastStoreDate } from "./select-last-store-date.js";

export const selectLastStoreAllVideosDate = async () => selectLastStoreDate(SEARCH_ALL_VIDEOS);
