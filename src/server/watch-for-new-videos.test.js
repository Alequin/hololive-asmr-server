import nock from "nock";
import { setupDatabase } from "../../scripts/setup-database";
import { getEnvironmentVariables } from "../config/config";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { upsertChannel } from "../database/upsert-channel";
import { upsertLastStoreAllVideosDate } from "../database/upsert-last-store-all-videos-date";
import { upsertLastStoreChannelDetails } from "../database/upsert-last-store-channel-details";
import { upsertLastStoreRecentVideosDate } from "../database/upsert-last-store-recent-videos-date";
import * as storeChannelDetails from "../store-channel-details/store-channel-details";
import * as storeAllVideoDetails from "../store-video-details/store-all-video-details";
import * as storeRecentVideoDetails from "../store-video-details/store-recent-video-details";
import { mockYoutubeChannelDetails, mockYoutubeVideosInPlaylist } from "../test-utils/nock-mocks";
import { attemptToFindNewVideos } from "./watch-for-new-videos";

const { databaseName } = getEnvironmentVariables();

describe("watch-for-new-videos", () => {
  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.spyOn(storeChannelDetails, "storeChannelDetails");
    jest.spyOn(storeAllVideoDetails, "storeAllVideoDetails");
    jest.spyOn(storeRecentVideoDetails, "storeRecentVideoDetails");

    await database.connect(databaseName);
    await truncateDatabase();
  });

  afterEach(async () => {
    nock.cleanAll(); // remove persisted nock mocks
    await database.disconnect();
  });

  afterAll(async () => {
    await database.connect(databaseName);
    await dropAllDatabaseTables();
    await database.disconnect();
  });

  const channel = {
    channelTitle: "Tsukumo Sana Ch. hololive-EN",
    channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
  };

  const mockPlaylistId = "UUO_aKKYxn4tvrqPjcTzZ6EQ";
  const mockThumbnail = "thumbnail-url.png";
  const oneWeekAndOneSecond = 1000 * 60 * 60 * 24 * 7 + 1000;
  const oneHourAndOneSecond = 1000 * 60 * 60 + 1000;
  const mockVideoCache = { update: jest.fn() };

  it("stores all channels if the last time it tried was a week ago", async () => {
    await upsertLastStoreChannelDetails(new Date(Date.now() - oneWeekAndOneSecond));
    await upsertLastStoreAllVideosDate(new Date());
    await upsertLastStoreRecentVideosDate(new Date());

    mockYoutubeChannelDetails(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: channel.channelId,
            snippet: {
              title: channel.channelTitle,
              thumbnails: {
                medium: {
                  url: mockThumbnail,
                },
              },
            },
            contentDetails: {
              relatedPlaylists: {
                uploads: mockPlaylistId,
              },
            },
          },
        ],
      },
    });

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel]);

    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(1);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("stores all videos if the last time it tried was a week ago", async () => {
    await upsertChannel({
      channelTitle: channel.channelTitle,
      channelId: channel.channelId,
      uploadPlaylistId: mockPlaylistId,
      thumbnailUrl: "mock-thumbnail",
    });

    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date(Date.now() - oneWeekAndOneSecond));
    await upsertLastStoreRecentVideosDate(new Date());

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel]);

    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(0);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("finds recent videos when the last time it tried as over an hour ago", async () => {
    await upsertChannel({
      channelTitle: channel.channelTitle,
      channelId: channel.channelId,
      uploadPlaylistId: mockPlaylistId,
      thumbnailUrl: "mock-thumbnail",
    });

    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date());
    await upsertLastStoreRecentVideosDate(new Date(Date.now() - oneHourAndOneSecond));

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel]);

    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(0);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(1);
  });

  it("stores all channels and videos if there is no record of fetching any videos", async () => {
    mockYoutubeChannelDetails(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: channel.channelId,
            snippet: {
              title: channel.channelTitle,
              thumbnails: {
                medium: {
                  url: mockThumbnail,
                },
              },
            },
            contentDetails: {
              relatedPlaylists: {
                uploads: mockPlaylistId,
              },
            },
          },
        ],
      },
    });

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel]);

    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(1);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("stores all videos and does not attempt to find recent videos if both the attempt to store all videos and the attempt to find new videos have timed out", async () => {
    await upsertChannel({
      channelTitle: channel.channelTitle,
      channelId: channel.channelId,
      uploadPlaylistId: mockPlaylistId,
      thumbnailUrl: "mock-thumbnail",
    });

    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date(Date.now() - oneWeekAndOneSecond));
    await upsertLastStoreRecentVideosDate(new Date(Date.now() - oneHourAndOneSecond));

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel]);

    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(0);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("finds recent videos if there is no record of attempting in the past but there is a record of storing all videos, which has not timed out", async () => {
    await upsertChannel({
      channelTitle: channel.channelTitle,
      channelId: channel.channelId,
      uploadPlaylistId: mockPlaylistId,
      thumbnailUrl: "mock-thumbnail",
    });

    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date(Date.now()));

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel]);

    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(0);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(1);
  });

  it("does nothing if requests for videos and channels was made recently", async () => {
    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date());
    await upsertLastStoreRecentVideosDate(new Date());

    mockYoutubeChannelDetails(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: channel.channelId,
            snippet: {
              title: channel.channelTitle,
              thumbnails: {
                medium: {
                  url: mockThumbnail,
                },
              },
            },
            contentDetails: {
              relatedPlaylists: {
                uploads: mockPlaylistId,
              },
            },
          },
        ],
      },
    });

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel]);

    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(0);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("does not throw an error if there is an issue fetching channel details", async () => {
    mockYoutubeChannelDetails(channel.channelId, {
      responseStatus: 400,
      response: null,
    });

    await attemptToFindNewVideos([channel]).catch(() => {
      throw "There should be no error";
    });
  });

  it("does not throw an error if there is an issue fetching all video details", async () => {
    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date(Date.now() - oneWeekAndOneSecond));

    mockYoutubeVideosInPlaylist(channel.channelId, {
      responseStatus: 400,
      response: null,
    });

    await attemptToFindNewVideos([channel]).catch(() => {
      throw "There should be no error";
    });
  });

  it("does not throw an error if there is an issue fetching recent video details", async () => {
    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date());
    await upsertLastStoreRecentVideosDate(new Date(Date.now() - oneHourAndOneSecond));

    mockYoutubeVideosInPlaylist(channel.channelId, {
      responseStatus: 400,
      response: null,
    });

    await attemptToFindNewVideos([channel]).catch(() => {
      throw "There should be no error";
    });
  });

  it("updates the video cache when all channels are updated", async () => {
    await upsertLastStoreChannelDetails(new Date(Date.now() - oneWeekAndOneSecond));
    await upsertLastStoreAllVideosDate(new Date());
    await upsertLastStoreRecentVideosDate(new Date());

    mockYoutubeChannelDetails(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: channel.channelId,
            snippet: {
              title: channel.channelTitle,
              thumbnails: {
                medium: {
                  url: mockThumbnail,
                },
              },
            },
            contentDetails: {
              relatedPlaylists: {
                uploads: mockPlaylistId,
              },
            },
          },
        ],
      },
    });

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel], mockVideoCache);

    // Confirm both channel and video details were stored
    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(1);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);

    // Confirm update was called on the cache
    expect(mockVideoCache.update).toHaveBeenCalledTimes(1);
  });

  it("updates the video cache when all videos are stored", async () => {
    await upsertChannel({
      channelTitle: channel.channelTitle,
      channelId: channel.channelId,
      uploadPlaylistId: mockPlaylistId,
      thumbnailUrl: "mock-thumbnail",
    });

    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date(Date.now() - oneWeekAndOneSecond));
    await upsertLastStoreRecentVideosDate(new Date());

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel], mockVideoCache);

    // Confirm all videos were stored but not channels
    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(0);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);

    // Confirm update was called on the cache
    expect(mockVideoCache.update).toHaveBeenCalledTimes(1);
  });

  it("updates the video cache when recent videos are stored", async () => {
    await upsertChannel({
      channelTitle: channel.channelTitle,
      channelId: channel.channelId,
      uploadPlaylistId: mockPlaylistId,
      thumbnailUrl: "mock-thumbnail",
    });

    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date());
    await upsertLastStoreRecentVideosDate(new Date(Date.now() - oneHourAndOneSecond));

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel], mockVideoCache);

    // Confirm only recent videos were stored
    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(0);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(1);

    // Confirm update was called on the cache
    expect(mockVideoCache.update).toHaveBeenCalledTimes(1);
  });

  it("does not update video cache if no requests for videos and channels are made", async () => {
    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date());
    await upsertLastStoreRecentVideosDate(new Date());

    mockYoutubeChannelDetails(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: channel.channelId,
            snippet: {
              title: channel.channelTitle,
              thumbnails: {
                medium: {
                  url: mockThumbnail,
                },
              },
            },
            contentDetails: {
              relatedPlaylists: {
                uploads: mockPlaylistId,
              },
            },
          },
        ],
      },
    });

    mockYoutubeVideosInPlaylist(mockPlaylistId, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channelId,
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "4oSpgjVH_kI",
              },
            },
          },
        ],
      },
    });

    await attemptToFindNewVideos([channel]);

    // Confirm nothing was stored
    expect(storeChannelDetails.storeChannelDetails).toHaveBeenCalledTimes(0);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);

    // Confirm cache was not updated
    expect(mockVideoCache.update).toHaveBeenCalledTimes(0);
  });
});
