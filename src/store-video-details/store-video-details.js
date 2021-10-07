import { isEmpty } from "lodash";
import { upsertVideo } from "../database/upsert-video.js";
import { logger } from "../logger.js";
import { searchVideos } from "./search-videos.js";

export const storeVideoDetails = async (channels) => {
  for (const channel of channels) {
    logger.info(channel.channelTitle);

    const asmrVideos = await searchAsmrVideosRecursively({
      channelId: channel.channelId,
    });

    const formattedVideos = asmrVideos.map((video) => ({
      videoId: video.id.videoId,
      channelTitle: video.snippet.channelTitle,
      videoTitle: video.snippet.title,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
    }));

    for (const video of formattedVideos) await upsertVideo(video);
  }
};

const searchAsmrVideosRecursively = async (searchArgs, previousVideos = []) => {
  const response = await searchVideos({
    ...searchArgs,
    queryTerms: ["asmr"],
  });
  logger.count("api call count");

  const asmrVideos = response.items.filter((video) =>
    /asmr/i.test(video.snippet.title)
  );

  const allVideos = [...previousVideos, ...asmrVideos];
  if (!response.nextPageToken || isEmpty(asmrVideos))
    return allVideos.filter(
      (video) => !VIDEO_ID_BLOCKLIST.includes(video.id.videoId)
    );

  // Search again with next page token if one is available
  return searchAsmrVideosRecursively(
    { ...searchArgs, pageToken: response.nextPageToken },
    allVideos
  );
};

export const VIDEO_ID_BLOCKLIST = ["oRN_5TPDdhI"];
