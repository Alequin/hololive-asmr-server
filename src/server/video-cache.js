import { selectAllVideosWithChannelDetails } from "../database/select-all-videos-with-channel-details";

export const newVideoCache = () => {
  let cache = [];

  return {
    get: () => cache,
    update: async () => (cache = await selectAllVideosWithChannelDetails()),
  };
};
