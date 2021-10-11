import lodash from "lodash";
import { getEnvironmentVariables } from "../config/config";
import { getJson } from "../http-requests/get-json";
import { removeNilValuesFromObject } from "./remove-nil-values-from-object";

const { youtubeApiKey } = getEnvironmentVariables();
const CHANNEL_URL = "https://www.googleapis.com/youtube/v3/channels";

/**
 * Returns the given channel IDs playlist id for all the uploaded videos
 *
 * Based on the search endpoint from the youtube data api
 * - https://developers.google.com/youtube/v3/docs/search/list
 */
export const getChannelUploadPlaylistId = async (channelId) => {
  // https://www.googleapis.com/youtube/v3/channels?id=UCO_aKKYxn4tvrqPjcTzZ6EQ&key=AIzaSyAXDTgjIzk2yMTzc6zF2OCvvbfN4oKM7z0&part=contentDetails
  const channelDetailsParams = new URLSearchParams(
    removeNilValuesFromObject({
      key: youtubeApiKey,
      id: channelId,
      part: "contentDetails",
    })
  );

  const channelDetails = await getJson({
    url: `${CHANNEL_URL}?${channelDetailsParams.toString()}`,
  });
  if (channelDetails.status >= 400) {
    throw new Error(
      `There was an issue while fetching details for a channel / Error: ${
        channelDetails.error
      }, Status: ${channelDetails.status}, Search args ${JSON.stringify({
        channelId,
      })}`
    );
  }

  return channelDetails.data.items[0].contentDetails.relatedPlaylists.uploads;
};
