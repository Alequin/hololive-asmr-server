import { logger } from "../../../logger.js";

export const path = "/videos";

export const getVideos = (videoCache) => {
  return async (_req, res) => {
    res.json(await videoCache.get());
  };
};
