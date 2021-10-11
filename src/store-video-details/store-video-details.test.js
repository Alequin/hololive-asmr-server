import nock from "nock";
import { setupDatabase } from "../../scripts/setup-database";
import { getEnvironmentVariables } from "../config/config";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { selectAllVideos } from "../database/select-all-videos";
import { storeVideoDetails, VIDEO_ID_BLOCKLIST } from "./store-video-details";
import * as getVideosInPlaylist from "./get-videos-in-playlist";
import { upsertVideo } from "../database/upsert-video";
import { selectLastVideoSearchDate } from "../database/select-last-video-search-date";

const { youtubeApiKey, databaseName } = getEnvironmentVariables();

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

  const channel = {
    channelTitle: "Tsukumo Sana Ch. hololive-EN",
    channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
  };
  const mockPlaylistId = "UUO_aKKYxn4tvrqPjcTzZ6EQ";

  it("makes api calls for the requested youtube channels and stores the returned asmr videos", async () => {
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

  it("add the last date at which the videos were searched", async () => {
    expect(await selectLastVideoSearchDate()).toBe(null);

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

    const startTime = Date.now();
    await storeVideoDetails([channel]);

    const time = await selectLastVideoSearchDate();
    expect(time.getTime()).toBeGreaterThan(startTime);
  });

  it("does not store videos which are missing asmr from the title", async () => {
    const channel = {
      channelTitle: "Tsukumo Sana Ch. hololive-EN",
      channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
    };

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

    await storeVideoDetails([channel]);

    expect(await selectAllVideos()).toHaveLength(0);
  });

  it("calls the api twice if the first request includes a nextPageToken", async () => {
    const getVideosSpy = jest.spyOn(getVideosInPlaylist, "getVideosInPlaylist");

    const items = [
      {
        snippet: {
          publishedAt: "2021-06-25T16:53:29Z",
          channelId: channel.channelId,
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
        nextPageToken: "nextPageToken",
        items,
      },
    });

    mockYoutubeVideosInPlaylistNextPage(mockPlaylistId, "nextPageToken", {
      responseStatus: 200,
      response: {
        items,
      },
    });

    await storeVideoDetails([channel]);

    expect(getVideosSpy).toHaveBeenCalledTimes(2);
  });

  it("throws an error if there is an issue fetching the playlist id", async () => {
    mockYoutubeChannelPlaylistId(channel.channelId, {
      responseStatus: 400,
      response: null,
    });

    expect(() => storeVideoDetails([channel])).rejects.toBeDefined();
  });

  it("throws an error if there is an issue fetching the playlist videos", async () => {
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
      responseStatus: 400,
      response: null,
    });

    expect(() => storeVideoDetails([channel])).rejects.toBeDefined();
  });
});

const mockYoutubeChannelPlaylistId = (channelId, { response, responseStatus }) =>
  nock(`https://www.googleapis.com`)
    .get(`/youtube/v3/channels?key=${youtubeApiKey}&id=${channelId}&part=contentDetails`)
    .reply(responseStatus, response)
    .persist();

const mockYoutubeVideosInPlaylist = (playlistId, { response, responseStatus }) =>
  nock(`https://www.googleapis.com`)
    .get(
      `/youtube/v3/playlistItems?key=${youtubeApiKey}&playlistId=${playlistId}&maxResults=50&part=snippet`
    )
    .reply(responseStatus, response)
    .persist();

const mockYoutubeVideosInPlaylistNextPage = (
  playlistId,
  nextPageToken,
  { response, responseStatus }
) =>
  nock(`https://www.googleapis.com`)
    .get(
      `/youtube/v3/playlistItems?key=${youtubeApiKey}&playlistId=${playlistId}&maxResults=50&part=snippet&pageToken=${nextPageToken}`
    )
    .reply(responseStatus, response)
    .persist();
