export const videoApiResponseToDbColumns = (videosFromApi) =>
  videosFromApi.map((video) => ({
    videoId: video.snippet.resourceId.videoId,
    videoTitle: video.snippet.title,
    channelId: video.snippet.channelId,
    thumbnailUrl: video.snippet.thumbnails.medium.url,
    publishedAt: video.snippet.publishedAt,
  }));
