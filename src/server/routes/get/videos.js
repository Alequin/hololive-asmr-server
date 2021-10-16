import { selectAllVideosWithChannelDetails } from "../../../database/select-all-videos-with-channel-details.js";
import { selectAllVideos } from "../../../database/select-all-videos.js";
import { logger } from "../../../logger.js";
import { newCache } from "../../in-memory-cache.js";

export const path = "/videos";

export const getVideos = () => {
  const videoCache = newCache();
  return async (_req, res) => {
    try {
      const { value: videosInCache, hasTimedOut } = videoCache.get("videos");

      const videosToUse = hasTimedOut ? await selectAllVideosWithChannelDetails() : videosInCache;

      if (hasTimedOut) videoCache.add("videos", videosToUse);

      res.json(videosToUse);
    } catch (error) {
      const message = "Unable to complete request for videos";
      logger.error(`${message} / Error: ${error.message}`);

      res.status(500);
      res.send(message);
    }
  };
};
