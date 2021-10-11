import { getVideosInPlaylist } from "./get-videos-in-playlist.js";

export const getChannelAsmrVideos = async (channelUploadsPlaylistId, nextPageToken = null) => {
  const response = await getVideosInPlaylist({
    playlistId: channelUploadsPlaylistId,
    nextPageToken,
  });

  return {
    videos: response.items.filter((video) => /asmr/i.test(video.snippet.title)),
    nextPageToken: response.nextPageToken,
  };
};
