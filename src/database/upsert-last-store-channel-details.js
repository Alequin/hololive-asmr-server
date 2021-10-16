import { SEARCH_CHANNELS } from "../config/search-types.js";
import { upsertLastSearchDate } from "./upsert-last-search-date.js";

export const upsertLastStoreChannelDetails = async (date) =>
  upsertLastSearchDate(SEARCH_CHANNELS, date);
