import nock from "nock";
import { setupDatabase } from "../../scripts/setup-database";
import { getEnvironmentVariables } from "../config/config";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { upsertLastStoreAllVideosDate } from "../database/upsert-last-store-all-videos-date";
import { upsertLastStoreRecentVideosDate } from "../database/upsert-last-store-recent-videos-date";
import * as storeAllVideoDetails from "../store-video-details/store-all-video-details";
import * as storeRecentVideoDetails from "../store-video-details/store-recent-video-details";
import {
  mockYoutubeChannelPlaylistId,
  mockYoutubeVideosInPlaylist,
} from "../test-utils/nock-mocks";
import { attemptToFindNewVideos } from "./watch-for-new-videos";

const { youtubeApiKey, databaseName } = getEnvironmentVariables();

describe("attempt-to-find-new-videos", () => {
  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
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
  it("stores all videos if the last time it tried was a week ago", async () => {
    const oneWeekAndOneSecond = 1000 * 60 * 60 * 24 * 7 + 1000;
    await upsertLastStoreAllVideosDate(new Date(Date.now() - oneWeekAndOneSecond));

    mockYoutubeChannelPlaylistId(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
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

    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("finds recent videos when the last time it tried as over an hour ago", async () => {
    const oneHourAndOneSecond = 1000 * 60 * 60 + 1000;
    await upsertLastStoreRecentVideosDate(new Date(Date.now() - oneHourAndOneSecond));
    await upsertLastStoreAllVideosDate(new Date(Date.now()));

    mockYoutubeChannelPlaylistId(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
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

    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("stores all videos and does not attempt to find recent videos if both the attempt to store all videos and the attempt to find new videos have timed out", async () => {
    const oneWeekAndOneSecond = 1000 * 60 * 60 * 24 * 7 + 1000;
    await upsertLastStoreAllVideosDate(new Date(Date.now() - oneWeekAndOneSecond));
    const oneHourAndOneSecond = 1000 * 60 * 60 + 1000;
    await upsertLastStoreRecentVideosDate(new Date(Date.now() - oneHourAndOneSecond));

    mockYoutubeChannelPlaylistId(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
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

    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("stores all videos if there is no record of fetching any videos", async () => {
    mockYoutubeChannelPlaylistId(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
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

    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(0);
  });

  it("finds recent videos if there is record of attempting in the past but there is a record of storing all videos, which has not timed out", async () => {
    await upsertLastStoreAllVideosDate(new Date(Date.now()));

    mockYoutubeChannelPlaylistId(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
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

    expect(storeRecentVideoDetails.storeRecentVideoDetails).toHaveBeenCalledTimes(1);
    expect(storeAllVideoDetails.storeAllVideoDetails).toHaveBeenCalledTimes(0);
  });
});
