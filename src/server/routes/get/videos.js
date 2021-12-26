import { orderBy } from "lodash";
import { logger } from "../../../logger.js";

export const path = "/videos";

export const getVideos = (videoCache) => {
  return async (req, res) => {
    try {
      res.json(filterVideos(await videoCache.get(), req.query));
    } catch (error) {
      const message = "Unable to complete request for videos";
      console.error(`${message} / Error: ${error.message}`);

      res.status(500);
      res.send(message);
    }
  };
};

const filterVideos = (
  videos,
  {
    channelIds,
    orderByKey = "published_at",
    orderDirection,
    max = Number.MAX_SAFE_INTEGER,
    offset = 0,
  }
) => {
  const videosByChannelIds = channelIds
    ? getVideosByChannelIds(videos, channelIds)
    : videos;

  const orderedVideos = orderBy(videosByChannelIds, orderByKey, orderDirection);

  return orderedVideos.slice(Number(offset), Number(offset) + Number(max));
};

const getVideosByChannelIds = (videos, channelIds) => {
  const listOfChannelIds = channelIds.split(",");
  return videos.filter(({ channel_id }) =>
    listOfChannelIds.includes(channel_id)
  );
};
