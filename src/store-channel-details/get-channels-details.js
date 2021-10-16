import lodash from "lodash";
import { getEnvironmentVariables } from "../config/config";
import { getJson } from "../http-requests/get-json";
import { removeNilValuesFromObject } from "../remove-nil-values-from-object";

const { youtubeApiKey } = getEnvironmentVariables();
const CHANNEL_URL = "https://www.googleapis.com/youtube/v3/channels";
export const MAX_CHANNELS_DETAILS_REQUEST_COUNT = 50;
/**
 * Returns the given channel IDs playlist id for all the uploaded videos
 *
 * Based on the search endpoint from the youtube data api
 * - https://developers.google.com/youtube/v3/docs/search/list
 */
export const getChannelsDetails = async (channelIds) => {
  if (channelIds.length > MAX_CHANNELS_DETAILS_REQUEST_COUNT)
    throw new Error("Cannot get details for more than 50 channels at one time");

  const channelIdsCSV = channelIds.join(",");
  const channelsDetailsParams = new URLSearchParams(
    removeNilValuesFromObject({
      key: youtubeApiKey,
      id: channelIdsCSV,
      part: "contentDetails,snippet",
    })
  );

  const channelsDetails = await getJson({
    url: `${CHANNEL_URL}?${channelsDetailsParams.toString()}`,
  });
  if (channelsDetails.status >= 400) {
    throw new Error(
      `There was an issue while fetching details for a channel / Error: ${channelsDetails.error}, Status: ${channelsDetails.status}, Search args ${channelIdsCSV}`
    );
  }

  return channelsDetails.data;
};
