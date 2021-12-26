import { selectAllVideosWithChannelDetails } from "../database/select-all-videos-with-channel-details";
import { logger } from "../logger";

export const newVideoCache = () => {
  let cache = null;
  let lastUpdateTime = null;

  const updateCache = async () => {
    cache = await selectAllVideosWithChannelDetails();
    lastUpdateTime = Date.now();
  };

  return {
    get: async () => {
      if (!cache) await updateCache();
      return cache;
    },
    update: async () => {
      try {
        await updateCache();
      } catch (error) {
        // If there is an issue another attempt will be made on next request or on next update
        logger.error(error);
      }
    },
    lastUpdateTime: () => lastUpdateTime,
    reset: () => {
      cache = null;
      lastUpdateTime = null;
    },
  };
};

export const staticVideoCache = newVideoCache();
