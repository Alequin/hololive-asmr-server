import { selectLastStoreAllVideosDate } from "../database/select-last-store-all-videos-date";
import { selectLastStoreRecentVideosDate } from "../database/select-last-store-recent-videos-date";
import { logger } from "../logger";
import { storeAllVideoDetails } from "../store-video-details/store-all-video-details";
import { storeRecentVideoDetails } from "../store-video-details/store-recent-video-details";

const ONE_HOUR = 1000 * 60 * 60;

export const watchForNewVideos = async (channels) => {
  await attemptToFindNewVideos(channels);
  setInterval(attemptToFindNewVideos, ONE_HOUR);
};

export const attemptToFindNewVideos = async (channels) => {
  try {
    const nextFetchTime = Date.now();

    const lastFullVideoRequest = await selectLastStoreAllVideosDate();
    const timeTillNextFullVideoRequest =
      lastFullVideoRequest && timePlusOneWeek(lastFullVideoRequest.getTime()) - nextFetchTime;

    const lastRecentVideoRequest = await selectLastStoreRecentVideosDate();
    const timeTillNextRecentVideoRequest =
      lastRecentVideoRequest && timePlusOneHour(lastRecentVideoRequest.getTime()) - nextFetchTime;

    const shouldStoreAllVideos = !timeTillNextFullVideoRequest || timeTillNextFullVideoRequest < 0;
    if (shouldStoreAllVideos) {
      await storeAllVideoDetails(channels);
    }

    const shouldStoreRecentVideos =
      (!timeTillNextRecentVideoRequest || timeTillNextRecentVideoRequest < 0) &&
      !shouldStoreAllVideos;
    if (shouldStoreRecentVideos) {
      await storeRecentVideoDetails(channels);
    }
  } catch (error) {
    logger.error(error);
  }
};

const timePlusOneWeek = (time) => {
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return time + oneWeek;
};

const timePlusOneHour = (time) => {
  const oneHour = 1000 * 60 * 60;
  return time + oneHour;
};
