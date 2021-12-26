import { uniqBy } from "lodash";

export const path = "/channels";

export const getChannels = (videoCache) => {
  return async (_req, res) => {
    const channels = getChannelsFromVideos(videoCache.get());
    res.json(channels);
  };
};

const getChannelsFromVideos = (videos) =>
  uniqBy(videos, "channel_title").map(
    ({ channel_thumbnail_url, channel_title }) => ({
      channel_title,
      channel_thumbnail_url,
    })
  );
