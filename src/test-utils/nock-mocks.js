import nock from "nock";
import { getEnvironmentVariables } from "../config/config";

const { youtubeApiKey, databaseName } = getEnvironmentVariables();

export const mockYoutubeChannelDetails = (
  channelId,
  { response, responseStatus }
) =>
  nock(`https://www.googleapis.com`)
    .get(
      `/youtube/v3/channels?key=${youtubeApiKey}&id=${channelId}&part=contentDetails,snippet`
    )
    .reply(responseStatus, response)
    .persist();

export const mockYoutubeVideosInPlaylist = (
  playlistId,
  { response, responseStatus }
) =>
  nock(`https://www.googleapis.com`)
    .get(
      `/youtube/v3/playlistItems?key=${youtubeApiKey}&playlistId=${playlistId}&maxResults=50&part=snippet`
    )
    .reply(responseStatus, response)
    .persist();

export const mockYoutubeVideosInPlaylistNextPage = (
  playlistId,
  nextPageToken,
  { response, responseStatus }
) =>
  nock(`https://www.googleapis.com`)
    .get(
      `/youtube/v3/playlistItems?key=${youtubeApiKey}&playlistId=${playlistId}&maxResults=50&part=snippet&pageToken=${nextPageToken}`
    )
    .reply(responseStatus, response)
    .persist();
