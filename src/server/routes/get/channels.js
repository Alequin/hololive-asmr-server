import { uniqBy } from "lodash";
import { logger } from "../../../logger.js";

export const path = "/channels";

// const cachedChannels

export const getChannels = (videoCache) => {
  return async (_req, res) => {
    try {
      const channels = getChannelsFromVideos(await videoCache.get());
      res.json(channels);
    } catch (error) {
      const message = "Unable to complete request for videos";
      logger.error(`${message} / Error: ${error.message}`);

      res.status(500);
      res.send(message);
    }
  };
};

const getChannelsFromVideos = (videos) =>
  uniqBy(videos, "channel_title").map(
    ({ channel_thumbnail_url, channel_title }) => ({
      channel_title,
      channel_thumbnail_url,
    })
  );
