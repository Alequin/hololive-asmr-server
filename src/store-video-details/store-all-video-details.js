import { deleteVideosByChannelId } from "../database/delete-videos-by-channel-id.js";
import { upsertLastStoreAllVideosDate } from "../database/upsert-last-store-all-videos-date";
import { upsertVideo } from "../database/upsert-video.js";
import { logger } from "../logger.js";
import { getChannelAsmrVideos } from "./get-channel-asmr-videos.js";
import { getChannelUploadPlaylistId } from "./get-channel-upload-playlist-id.js";
import { videoApiResponseToDbColumns } from "./video-api-response-to-db-columns.js";

export const storeAllVideoDetails = async (channels) => {
  for (const channel of channels) {
    logger.info(channel.channelTitle);

    const videos = videoApiResponseToDbColumns(
      await getAllChannelVideos(await getChannelUploadPlaylistId(channel.channelId))
    );

    logger.info(`Found ${videos.length} videos`);

    await deleteVideosByChannelId(channel.channelId); // Clean up old videos in case any were made private
    for (const video of videos) await upsertVideo(video); // Insert all identified videos
    logger.info("-------------------------------------------------------------------");
  }

  await upsertLastStoreAllVideosDate(new Date());
};

const getAllChannelVideos = async (
  channelUploadsPlaylistId,
  nextPageToken = null,
  previousVideos = []
) => {
  const { videos, nextPageToken: newNextPageToken } = await getChannelAsmrVideos(
    channelUploadsPlaylistId,
    nextPageToken
  );

  const allVideos = [...previousVideos, ...videos];
  if (!newNextPageToken) return allVideos;

  // Search again with next page token if one is available
  return getAllChannelVideos(channelUploadsPlaylistId, newNextPageToken, allVideos);
};
