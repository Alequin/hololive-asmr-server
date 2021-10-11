export const videoApiResponseToDbColumns = (videosFromApi) =>
  videosFromApi.map((video) => ({
    videoId: video.snippet.resourceId.videoId,
    channelTitle: video.snippet.channelTitle,
    videoTitle: video.snippet.title,
    thumbnailUrl: video.snippet.thumbnails.medium.url,
    channelId: video.snippet.channelId,
    publishedAt: video.snippet.publishedAt,
  }));
