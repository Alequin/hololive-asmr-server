import { getVideosInPlaylist } from "./get-videos-in-playlist.js";

export const getAsmrVideosInPlaylist = async (
  channelUploadsPlaylistId,
  nextPageToken = null
) => {
  const response = await getVideosInPlaylist({
    playlistId: channelUploadsPlaylistId,
    nextPageToken,
  });

  return {
    videos: response.items.filter(
      (video) => isASMRVideo(video) || isVideoInAllowList(video)
    ),
    nextPageToken: response.nextPageToken,
  };
};

const isASMRVideo = (video) => /asmr/i.test(video.snippet.title);

// A list of video to include even if they don't fit the rules in `isASMRVideo`
export const VIDEO_ID_ALLOW_LIST = ["_7vOimsaTWI", "3M0sVzE9oKI"];
const isVideoInAllowList = (video) =>
  VIDEO_ID_ALLOW_LIST.includes(video.snippet.resourceId.videoId);
