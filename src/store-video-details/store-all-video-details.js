import { deleteVideosByChannelId } from "../database/delete-videos-by-channel-id.js";
import { upsertLastStoreAllVideosDate } from "../database/upsert-last-store-all-videos-date";
import { upsertVideo } from "../database/upsert-video.js";
import { logger } from "../logger.js";
import { getAsmrVideosInPlaylist } from "./get-asmr-videos-in-playlist.js";
import { videoApiResponseToDbColumns } from "./video-api-response-to-db-columns.js";

export const storeAllVideoDetails = async (channels) => {
  for (const channel of channels) {
    logger.info(channel.channel_title);

    const videos = await getAllPlaylistAsmrVideos(channel.upload_playlist_id);
    if (!videos) continue; // skip if there was an issue fetching videos

    logger.info(`Found ${videos.length} videos`);

    await deleteVideosByChannelId(channel.channel_id); // Clean up old videos in case any were made private
    for (const video of videoApiResponseToDbColumns(videos))
      await upsertVideo(video); // Insert all identified videos
    logger.info(
      "-------------------------------------------------------------------"
    );
  }

  await upsertLastStoreAllVideosDate(new Date());
};

const getAllPlaylistAsmrVideos = async (channelUploadsPlaylistId) => {
  try {
    return await getAllPlaylistAsmrVideosRecusive(channelUploadsPlaylistId);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const getAllPlaylistAsmrVideosRecusive = async (
  channelUploadsPlaylistId,
  nextPageToken = null,
  previousVideos = []
) => {
  const { videos, nextPageToken: newNextPageToken } =
    await getAsmrVideosInPlaylist(channelUploadsPlaylistId, nextPageToken);

  const allVideos = [...previousVideos, ...videos];
  if (!newNextPageToken) return allVideos;

  // Search again with next page token if one is available
  return getAllPlaylistAsmrVideosRecusive(
    channelUploadsPlaylistId,
    newNextPageToken,
    allVideos
  );
};
