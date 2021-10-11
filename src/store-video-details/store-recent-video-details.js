import { upsertLastStoreRecentVideosDate } from "../database/upsert-last-store-recent-videos-date.js";
import { upsertVideo } from "../database/upsert-video.js";
import { logger } from "../logger.js";
import { getChannelAsmrVideos } from "./get-channel-asmr-videos.js";
import { getChannelUploadPlaylistId } from "./get-channel-upload-playlist-id.js";
import { videoApiResponseToDbColumns } from "./video-api-response-to-db-columns.js";

export const storeRecentVideoDetails = async (channels) => {
  for (const channel of channels) {
    logger.info(channel.channelTitle);

    const { videos } = await getChannelAsmrVideos(
      await getChannelUploadPlaylistId(channel.channelId)
    );
    const videosToInsert = videoApiResponseToDbColumns(videos);

    logger.info(`Found ${videosToInsert.length} videos`);
    for (const video of videosToInsert) await upsertVideo(video);
    logger.info("-------------------------------------------------------------------");
  }

  await upsertLastStoreRecentVideosDate(new Date());
};
