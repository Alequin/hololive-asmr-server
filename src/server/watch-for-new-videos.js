import { selectAllChannels } from "../database/select-all-channels";
import { selectLastStoreAllVideosDate } from "../database/select-last-store-all-videos-date";
import { selectLastStoreChannelsDate } from "../database/select-last-store-channels-date";
import { selectLastStoreRecentVideosDate } from "../database/select-last-store-recent-videos-date";
import { logger } from "../logger";
import { storeChannelDetails } from "../store-channel-details/store-channel-details";
import { storeAllVideoDetails } from "../store-video-details/store-all-video-details";
import { storeRecentVideoDetails } from "../store-video-details/store-recent-video-details";

const ONE_HOUR = 1000 * 60 * 60;

export const watchForNewVideos = async (rawChannelDetails, videoCache) => {
  await attemptToFindNewVideos(rawChannelDetails, videoCache);
  setInterval(() => attemptToFindNewVideos(rawChannelDetails, videoCache), ONE_HOUR);
};

export const attemptToFindNewVideos = async (rawChannelDetails, videoCache) => {
  try {
    const nextFetchTime = Date.now();

    const hasUpdatedChannels = await fetchChannelDetailsIfRequired(
      rawChannelDetails,
      nextFetchTime
    );
    const hasUpdatedAllVideos = await fetchAllVideoDetailsIfRequired(nextFetchTime);
    const hasUpdatedRecentVideos =
      !hasUpdatedAllVideos && (await fetchRecentVideoDetailsIfRequired(nextFetchTime));

    if (hasUpdatedChannels || hasUpdatedAllVideos || hasUpdatedRecentVideos)
      await videoCache.update();
  } catch (error) {
    // Do not throw. Let the system try again on the next loop
    logger.error(error);
  }
};

const fetchChannelDetailsIfRequired = async (rawChannelDetails, nextFetchTime) => {
  const lastFullChannelRequest = await selectLastStoreChannelsDate();
  const timeTillNextFullChannelRequest =
    lastFullChannelRequest && timePlusOneWeek(lastFullChannelRequest.getTime()) - nextFetchTime;

  if (!hasTimeRunOut(timeTillNextFullChannelRequest)) return false;

  await storeChannelDetails(rawChannelDetails);
  return true;
};

const fetchAllVideoDetailsIfRequired = async (nextFetchTime) => {
  const lastFullVideoRequest = await selectLastStoreAllVideosDate();
  const timeTillNextFullVideoRequest =
    lastFullVideoRequest && timePlusOneWeek(lastFullVideoRequest.getTime()) - nextFetchTime;

  if (!hasTimeRunOut(timeTillNextFullVideoRequest)) return false;

  await storeAllVideoDetails(await selectAllChannels());
  return true;
};

const timePlusOneWeek = (time) => {
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return time + oneWeek;
};

const fetchRecentVideoDetailsIfRequired = async (nextFetchTime) => {
  const lastRecentVideoRequest = await selectLastStoreRecentVideosDate();
  const timeTillNextRecentVideoRequest =
    lastRecentVideoRequest && timePlusOneHour(lastRecentVideoRequest.getTime()) - nextFetchTime;

  if (!hasTimeRunOut(timeTillNextRecentVideoRequest)) return false;

  await storeRecentVideoDetails(await selectAllChannels());
  return true;
};

const timePlusOneHour = (time) => {
  const oneHour = 1000 * 60 * 60;
  return time + oneHour;
};

const hasTimeRunOut = (time) => !time || time <= 0;
