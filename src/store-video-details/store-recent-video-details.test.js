import nock from "nock";
import { setupDatabase } from "../../scripts/setup-database";
import { getEnvironmentVariables } from "../config/config";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { selectAllVideos } from "../database/select-all-videos";
import { selectLastStoreRecentVideosDate } from "../database/select-last-store-recent-videos-date";
import { upsertChannel } from "../database/upsert-channel";
import { upsertVideo } from "../database/upsert-video";
import {
  mockYoutubeChannelDetails,
  mockYoutubeVideosInPlaylist,
} from "../test-utils/nock-mocks";
import * as getVideosInPlaylist from "./get-videos-in-playlist";
import { storeRecentVideoDetails } from "./store-recent-video-details";

const { databaseName } = getEnvironmentVariables();

describe("store-recent-video-details", () => {
  const channel = {
    channel_title: "Tsukumo Sana Ch. hololive-EN",
    channel_id: "UCsUj0dszADCGbF3gNrQEuSQ",
    upload_playlist_id: "UUO_aKKYxn4tvrqPjcTzZ6EQ",
  };

  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    await database.connect(databaseName);
    await truncateDatabase();
    // upsert channel each time to satisfy the foreign key
    await upsertChannel({
      channelTitle: channel.channel_title,
      channelId: channel.channel_id,
      uploadPlaylistId: channel.upload_playlist_id,
      thumbnailUrl: "mock-thumbnail",
    });
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

  it("makes api calls for the requested youtube channels and stores the returned asmr videos", async () => {
    mockYoutubeVideosInPlaylist(channel.upload_playlist_id, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channel_id,
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

    await storeRecentVideoDetails([channel]);

    const videos = await selectAllVideos();
    expect(videos).toHaveLength(1);
    expect(videos).toEqual([
      {
        video_id: "4oSpgjVH_kI",
        channel_id: "UCsUj0dszADCGbF3gNrQEuSQ",
        video_title:
          "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
        thumbnail_url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
        published_at: "2021-06-25T16:53:29Z",
      },
    ]);
  });

  it("records the last date at which the videos were searched", async () => {
    expect(await selectLastStoreRecentVideosDate()).toBe(null);

    mockYoutubeVideosInPlaylist(channel.upload_playlist_id, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channel_id,
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

    await storeRecentVideoDetails([channel]);

    const currentTime = Date.now();
    const tenSeconds = 1000 * 10;
    const runTime = (await selectLastStoreRecentVideosDate()).getTime();

    // Confirm time is accurate to within 10 seconds
    expect(runTime).toBeGreaterThan(currentTime - tenSeconds);
    expect(runTime).toBeLessThan(currentTime + tenSeconds);
  });

  it("does not store videos which are missing asmr from the title", async () => {
    mockYoutubeVideosInPlaylist(channel.upload_playlist_id, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channel_id,
              title: "a bad video title",
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

    await storeRecentVideoDetails([channel]);

    expect(await selectAllVideos()).toHaveLength(0);
  });

  it("stores videos included in the allow list even if asmr is missing from the title", async () => {
    mockYoutubeVideosInPlaylist(channel.upload_playlist_id, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channel_id,
              title: "a bad video title",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
              resourceId: {
                videoId: "_7vOimsaTWI",
              },
            },
          },
        ],
      },
    });

    await storeRecentVideoDetails([channel]);

    expect(await selectAllVideos()).toHaveLength(1);
  });

  it("does not call the api twice if the first request includes a nextPageToken", async () => {
    const getVideosSpy = jest.spyOn(getVideosInPlaylist, "getVideosInPlaylist");

    const items = [
      {
        snippet: {
          publishedAt: "2021-06-25T16:53:29Z",
          channelId: channel.channel_id,
          title: "a bad video title",
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
    ];

    mockYoutubeVideosInPlaylist(channel.upload_playlist_id, {
      responseStatus: 200,
      response: {
        nextPageToken: "nextPageToken",
        items,
      },
    });

    await storeRecentVideoDetails([channel]);

    expect(getVideosSpy).toHaveBeenCalledTimes(1);
  });

  it("does not delete all old videos for the channel when finding new ones", async () => {
    await upsertVideo({
      videoId: "123",
      channelId: channel.channel_id,
      channelTitle: "Tsukumo Sana Ch. hololive-EN",
      publishedAt: "2021-06-25T16:53:29Z",
      thumbnailUrl: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
      videoTitle: "an asmr video",
    });

    mockYoutubeVideosInPlaylist(channel.upload_playlist_id, {
      responseStatus: 200,
      response: {
        items: [
          {
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: channel.channel_id,
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

    await storeRecentVideoDetails([channel]);

    const videos = await selectAllVideos();
    expect(videos).toHaveLength(2);
    expect(videos).toEqual([
      {
        video_id: "123",
        channel_id: channel.channel_id,
        published_at: "2021-06-25T16:53:29Z",
        thumbnail_url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
        video_title: "an asmr video",
      },
      {
        video_id: "4oSpgjVH_kI",
        channel_id: "UCsUj0dszADCGbF3gNrQEuSQ",
        video_title:
          "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
        thumbnail_url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
        published_at: "2021-06-25T16:53:29Z",
      },
    ]);
  });

  it("skips the channel if there is an issue fetching the playlist videos", async () => {
    mockYoutubeChannelDetails(channel.channel_id, {
      responseStatus: 200,
      response: {
        items: [
          {
            contentDetails: {
              relatedPlaylists: {
                uploads: channel.upload_playlist_id,
              },
            },
          },
        ],
      },
    });

    mockYoutubeVideosInPlaylist(channel.upload_playlist_id, {
      responseStatus: 400,
      response: null,
    });

    // Does not store any videos but also does not result in an error
    await storeRecentVideoDetails([channel]);
    const videos = await selectAllVideos();
    expect(videos).toHaveLength(0);
  });
});
