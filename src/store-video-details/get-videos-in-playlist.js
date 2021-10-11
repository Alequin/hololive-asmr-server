import { getEnvironmentVariables } from "../config/config";
import { getJson } from "../http-requests/get-json";
import { removeNilValuesFromObject } from "./remove-nil-values-from-object";

const { youtubeApiKey } = getEnvironmentVariables();
const PLAYLIST_ITEMS_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

/**
 * Returns a list of search results based on the given conditions
 *
 * Based on the search endpoint from the youtube data api
 * - https://developers.google.com/youtube/v3/docs/search/list
 */
export const getVideosInPlaylist = async ({ playlistId, nextPageToken } = {}) => {
  const playlistItemsParams = new URLSearchParams(
    removeNilValuesFromObject({
      key: youtubeApiKey,
      playlistId,
      part: "snippet",
      maxResults: 50,
      pageToken: nextPageToken,
    })
  );

  const channelUploadsPlaylist = await getJson({
    url: `${PLAYLIST_ITEMS_URL}?${playlistItemsParams.toString()}`,
  });

  if (channelUploadsPlaylist.status >= 400) {
    throw new Error(
      `There was an issue while getting videos for a channel / Error: ${
        channelUploadsPlaylist.error
      }, Status: ${channelUploadsPlaylist.status}, Search args ${JSON.stringify({
        playlistId,
      })}`
    );
  }

  return channelUploadsPlaylist.data;
};
