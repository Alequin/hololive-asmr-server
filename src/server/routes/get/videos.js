import lodash from "lodash";
import { selectAllVideos } from "../../../database/select-all-videos.js";
import { logger } from "../../../logger.js";

const { groupBy } = lodash;

export const path = "/videos";

export const getVideos = async (_req, res) => {
  try {
    res.json(await videosGroupedByChannel());
  } catch (error) {
    const message = "Unable to complete request for videos";
    logger.error(`${message} / Error: ${error.message}`);

    res.status(500);
    res.send(message);
  }
};

const videosGroupedByChannel = async () => {
  const videos = (await selectAllVideos()).map((video) => ({
    ...video,
    id: undefined, // Users don't need to know the database row id
  }));

  return groupBy(videos, "channelTitle");
};
