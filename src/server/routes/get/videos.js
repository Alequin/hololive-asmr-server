import { logger } from "../../../logger.js";

export const path = "/videos";

export const getVideos = (videoCache) => {
  return async (_req, res) => {
    try {
      res.json(videoCache.get());
    } catch (error) {
      const message = "Unable to complete request for videos";
      logger.error(`${message} / Error: ${error.message}`);

      res.status(500);
      res.send(message);
    }
  };
};
