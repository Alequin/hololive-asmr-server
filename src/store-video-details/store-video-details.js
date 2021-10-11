import { isEmpty } from "lodash";
import { deleteVideosByChannelId } from "../database/delete-videos-by-channel-id.js";
import { upsertLastVideoSearchDate } from "../database/upsert-last-video-search-date.js";
import { upsertVideo } from "../database/upsert-video.js";
import { logger } from "../logger.js";
import { getChannelUploadPlaylistId } from "./get-channel-upload-playlist-id.js";
import { getVideosInPlaylist } from "./get-videos-in-playlist.js";

export const storeVideoDetails = async (channels) => {
  for (const channel of channels) {
    logger.info(channel.channelTitle);

    const channelUploadsPlaylistId = await getChannelUploadPlaylistId(channel.channelId);

    const asmrVideos = await getAllChannelVideos(channelUploadsPlaylistId);

    const formattedVideos = asmrVideos.map((video) => ({
      videoId: video.snippet.resourceId.videoId,
      channelTitle: video.snippet.channelTitle,
      videoTitle: video.snippet.title,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
    }));

    logger.info(`Found ${formattedVideos.length} videos`);

    await deleteVideosByChannelId(channel.channelId); // Clean up old videos in case any were made private
    for (const video of formattedVideos) await upsertVideo(video); // Insert all identified videos

    logger.info("-------------------------------------------------------------------");
  }

  await upsertLastVideoSearchDate(new Date());
};

const getAllChannelVideos = async (
  channelUploadsPlaylistId,
  nextPageToken = null,
  previousVideos = []
) => {
  const response = await getVideosInPlaylist({
    playlistId: channelUploadsPlaylistId,
    maxResults: 50,
    nextPageToken,
  });

  const asmrVideos = response.items.filter((video) => /asmr/i.test(video.snippet.title));

  const allVideos = [...previousVideos, ...asmrVideos];
  if (!response.nextPageToken) return allVideos;

  // Search again with next page token if one is available
  return getAllChannelVideos(channelUploadsPlaylistId, response.nextPageToken, allVideos);
};
