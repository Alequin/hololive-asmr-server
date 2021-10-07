import lodash from "lodash";
import { getEnvironmentVariables } from "../config/config";
import { getJson } from "../http-requests/get-json";

const { isNil } = lodash;
const { youtubeApiKey } = getEnvironmentVariables();

const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const MAX_RETURN_RESULTS = 50;

const SEARCH_ORDER_OPTIONS = {};

/**
 * Returns a list of search results based on the given conditions
 *
 * Based on the search endpoint from the youtube data api
 * - https://developers.google.com/youtube/v3/docs/search/list
 */
export const searchVideos = async ({
  channelId,
  queryTerms,
  order,
  pageToken,
} = {}) => {
  const searchParams = new URLSearchParams(
    removeNilValues({
      key: youtubeApiKey,
      channelId,
      pageToken,
      order: SEARCH_ORDER_OPTIONS[order],
      q: queryTerms?.join(","),
      maxResults: MAX_RETURN_RESULTS,
      type: "video",
      part: "snippet",
    })
  );

  const searchResults = await getJson({
    url: `${SEARCH_URL}?${searchParams.toString()}`,
  });

  if (searchResults.status >= 400) {
    throw new Error(
      `There was an issue while searching for videos / Status: ${
        searchResults.status
      }, Search args ${JSON.stringify({
        channelId,
        queryTerms,
        order,
        pageToken,
      })}`
    );
  }

  return searchResults.data;
};

const removeNilValues = (object) => {
  const clonedObject = { ...object };
  for (const key in clonedObject)
    if (isNil(clonedObject[key])) delete clonedObject[key];

  return clonedObject;
};
