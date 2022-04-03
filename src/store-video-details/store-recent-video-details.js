import { upsertLastStoreRecentVideosDate } from "../database/upsert-last-store-recent-videos-date.js";
import { upsertVideo } from "../database/upsert-video.js";
import { logger } from "../logger.js";
import { getAsmrVideosInPlaylist } from "./get-asmr-videos-in-playlist.js";
import { videoApiResponseToDbColumns } from "./video-api-response-to-db-columns.js";

export const storeRecentVideoDetails = async (channels) => {
  for (const channel of channels) {
    logger.info(channel.channel_title);

    const videos = await fetchVideos(channel);
    if (!videos) continue; // skip if there was an issue fetching videos

    const videosToInsert = videoApiResponseToDbColumns(videos);

    logger.info(`Found ${videosToInsert.length} videos`);
    for (const video of videosToInsert) await upsertVideo(video);
    logger.info(
      "-------------------------------------------------------------------"
    );
  }

  await upsertLastStoreRecentVideosDate(new Date());
};

const fetchVideos = async (channel) => {
  try {
    const { videos } = await getAsmrVideosInPlaylist(
      channel.upload_playlist_id
    );
    return videos;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
