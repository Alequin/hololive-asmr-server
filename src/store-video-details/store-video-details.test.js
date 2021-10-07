import nock from "nock";
import { setupDatabase } from "../../scripts/setup-database";
import { getEnvironmentVariables } from "../config/config";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { selectAllVideos } from "../database/select-all-videos";
import { storeVideoDetails, VIDEO_ID_BLOCKLIST } from "./store-video-details";
import * as searchVideos from "./search-videos";
import { upsertVideo } from "../database/insert-video";

const { youtubeApiKey, databaseName, isEnvTest } = getEnvironmentVariables();

describe("store-video-details", () => {
  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();

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

  it("makes api calls for the requested youtube channels and stores the returned asmr videos", async () => {
    const channel = {
      channelTitle: "Tsukumo Sana Ch. hololive-EN",
      channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
    };

    mockYoutubeSearchApi(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: {
              videoId: "4oSpgjVH_kI",
            },
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
              title:
                "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
            },
          },
        ],
      },
    });

    await storeVideoDetails([channel]);

    const videos = await selectAllVideos();
    expect(videos).toHaveLength(1);
    expect(videos).toEqual([
      {
        id: expect.anything(),
        video_id: "4oSpgjVH_kI",
        channel_id: "UCsUj0dszADCGbF3gNrQEuSQ",
        channel_title: "Tsukumo Sana Ch. hololive-EN",
        video_title:
          "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
        thumbnail_url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
        published_at: "2021-06-25T16:53:29Z",
      },
    ]);
  });

  it("does not store videos which are missing asmr from the title", async () => {
    const channel = {
      channelTitle: "Tsukumo Sana Ch. hololive-EN",
      channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
    };

    mockYoutubeSearchApi(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: {
              videoId: "4oSpgjVH_kI",
            },
            snippet: {
              publishedAt: "2021-06-25T16:53:29Z",
              channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
              title: "not a video we want",
              thumbnails: {
                medium: {
                  url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                },
              },
              channelTitle: "Tsukumo Sana Ch. hololive-EN",
            },
          },
        ],
      },
    });

    await storeVideoDetails([channel]);

    expect(await selectAllVideos()).toHaveLength(0);
  });

  it("calls the api twice if the first request includes a nextPageToken", async () => {
    const searchVideosSpy = jest.spyOn(searchVideos, "searchVideos");

    const channel = {
      channelTitle: "Tsukumo Sana Ch. hololive-EN",
      channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
    };

    const items = [
      {
        id: {
          videoId: "4oSpgjVH_kI",
        },
        snippet: {
          publishedAt: "2021-06-25T16:53:29Z",
          channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
          title:
            "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
          thumbnails: {
            medium: {
              url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
            },
          },
          channelTitle: "Tsukumo Sana Ch. hololive-EN",
        },
      },
    ];

    mockYoutubeSearchApi(channel.channelId, {
      responseStatus: 200,
      response: {
        nextPageToken: "foobar",
        items,
      },
    });

    mockYoutubeSearchApiNextPage(channel.channelId, "foobar", {
      responseStatus: 200,
      response: {
        items,
      },
    });

    await storeVideoDetails([channel]);

    expect(searchVideosSpy).toHaveBeenCalledTimes(2);
  });

  it("calls the api once if the first request includes a nextPageToken but contains not asmr related videos", async () => {
    const searchVideosSpy = jest.spyOn(searchVideos, "searchVideos");

    const channel = {
      channelTitle: "Tsukumo Sana Ch. hololive-EN",
      channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
    };

    const items = [
      {
        id: {
          videoId: "4oSpgjVH_kI",
        },
        snippet: {
          publishedAt: "2021-06-25T16:53:29Z",
          channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
          title: "bad video",
          thumbnails: {
            medium: {
              url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
            },
          },
          channelTitle: "Tsukumo Sana Ch. hololive-EN",
        },
      },
    ];

    mockYoutubeSearchApi(channel.channelId, {
      responseStatus: 200,
      response: {
        nextPageToken: "foobar",
        items,
      },
    });

    mockYoutubeSearchApiNextPage(channel.channelId, "foobar", {
      responseStatus: 200,
      response: {
        items,
      },
    });

    await storeVideoDetails([channel]);

    expect(searchVideosSpy).toHaveBeenCalledTimes(1);
  });

  it("updates videos if the video_id returned by the api matches one in the database", async () => {
    upsertVideo({
      videoId: "4oSpgjVH_kI",
      channelTitle: "Tsukumo Sana Ch. hololive-EN",
      videoTitle:
        "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
      thumbnailUrl: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
      channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
      publishedAt: "2021-06-25T16:53:29Z",
    });

    const channel = {
      channelTitle: "Tsukumo Sana Ch. hololive-EN",
      channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
    };

    mockYoutubeSearchApi(channel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: {
              videoId: "4oSpgjVH_kI",
            },
            snippet: {
              publishedAt: "3021-06-25T16:53:29Z",
              channelId: "cool-channel",
              title: "【ASMR】new and improved title!!!!!!!!!!!!!",
              thumbnails: {
                medium: {
                  url: "what is this image???",
                },
              },
              channelTitle: "Tsukumo Sana",
            },
          },
        ],
      },
    });

    await storeVideoDetails([channel]);

    const videos = await selectAllVideos();
    expect(videos).toHaveLength(1);
    expect(videos).toEqual([
      {
        id: expect.anything(),
        video_id: "4oSpgjVH_kI",
        channel_id: "cool-channel",
        channel_title: "Tsukumo Sana",
        video_title: "【ASMR】new and improved title!!!!!!!!!!!!!",
        thumbnail_url: "what is this image???",
        published_at: "3021-06-25T16:53:29Z",
      },
    ]);
  });

  it.each(
    VIDEO_ID_BLOCKLIST,
    "does not store the video by id %s as it is included in the blockList",
    async (videoId) => {
      const channel = {
        channelTitle: "Tsukumo Sana Ch. hololive-EN",
        channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
      };

      mockYoutubeSearchApi(channel.channelId, {
        responseStatus: 200,
        response: {
          items: [
            {
              id: {
                videoId,
              },
              snippet: {
                publishedAt: "2021-06-25T16:53:29Z",
                channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
                title: "not a video we want",
                thumbnails: {
                  medium: {
                    url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
                  },
                },
                channelTitle: "Tsukumo Sana Ch. hololive-EN",
              },
            },
          ],
        },
      });

      await storeVideoDetails([channel]);

      expect(await selectAllVideos()).toHaveLength(0);
    }
  );
});

const mockYoutubeSearchApi = (channelId, { response, responseStatus }) =>
  nock(`https://www.googleapis.com`)
    .get(
      `/youtube/v3/search?key=${youtubeApiKey}&channelId=${channelId}&q=asmr&maxResults=50&type=video&part=snippet`
    )
    .reply(responseStatus, response)
    .persist();

const mockYoutubeSearchApiNextPage = (
  channelId,
  nextPageToken,
  { response, responseStatus }
) =>
  nock(`https://www.googleapis.com`)
    .get(
      `/youtube/v3/search?key=${youtubeApiKey}&channelId=${channelId}&pageToken=${nextPageToken}&q=asmr&maxResults=50&type=video&part=snippet`
    )
    .reply(responseStatus, response)
    .persist();
