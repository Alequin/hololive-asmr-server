import { SEARCH_CHANNELS } from "../config/search-types.js";
import { selectLastStoreDate } from "./select-last-store-date.js";

export const selectLastStoreChannelsDate = async () => selectLastStoreDate(SEARCH_CHANNELS);
