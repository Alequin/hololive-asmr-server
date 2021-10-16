import { chunk } from "lodash";
import { upsertChannel } from "../database/upsert-channel";
import { upsertLastStoreChannelDetails } from "../database/upsert-last-store-channel-details";
import { logger } from "../logger.js";
import { getChannelsDetails, MAX_CHANNELS_DETAILS_REQUEST_COUNT } from "./get-channels-details.js";

export const storeChannelDetails = async (allChannels) => {
  for (const channels of chunk(allChannels, MAX_CHANNELS_DETAILS_REQUEST_COUNT)) {
    const channelDetails = await getChannelsDetails(channels.map(({ channelId }) => channelId));

    for (const channel of channelDetails.items) {
      const channelTitle = channel.snippet.title;
      logger.info(channelTitle);
      await upsertChannel({
        channelId: channel.id,
        channelTitle,
        thumbnailUrl: channel.snippet.thumbnails.medium.url,
        uploadPlaylistId: channel.contentDetails.relatedPlaylists.uploads,
      });
      logger.info("-------------------------------------------------------------------");
    }
  }

  await upsertLastStoreChannelDetails(new Date());
};
