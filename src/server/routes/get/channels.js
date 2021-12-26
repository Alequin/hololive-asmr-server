import { orderBy, uniqBy } from "lodash";
import { logger } from "../../../logger.js";

export const path = "/channels";

export const getChannels = (videoCache) => {
  let cachedChannels = null;
  let lastKnownCacheUpdate = null;

  return async (_req, res) => {
    try {
      const lastCacheUpdate = videoCache.lastUpdateTime();
      if (cachedChannels && lastKnownCacheUpdate === lastCacheUpdate)
        return res.json(cachedChannels);

      cachedChannels = getChannelsFromVideos(await videoCache.get());
      lastKnownCacheUpdate = lastCacheUpdate;
      return res.json(cachedChannels);
    } catch (error) {
      const message = "Unable to complete request for videos";
      logger.error(`${message} / Error: ${error.message}`);

      res.status(500);
      res.send(message);
    }
  };
};

const getChannelsFromVideos = (videos) => {
  const channles = uniqBy(videos, "channel_title").map(
    ({ channel_thumbnail_url, channel_title }) => ({
      channel_title,
      channel_thumbnail_url,
    })
  );

  return orderBy(channles, "channel_title");
};
