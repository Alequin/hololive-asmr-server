import { last, uniqueId } from "lodash";
import nock from "nock";
import { setupDatabase } from "../../scripts/setup-database";
import { getEnvironmentVariables } from "../config/config";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { selectAllChannels } from "../database/select-all-channels";
import { selectLastStoreChannelsDate } from "../database/select-last-store-channels-date";
import { mockYoutubeChannelDetails } from "../test-utils/nock-mocks";
import * as getChannelsDetails from "./get-channels-details";
import { storeChannelDetails } from "./store-channel-details";

const { databaseName } = getEnvironmentVariables();

describe("store-channel-details", () => {
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

  const sanaChannel = {
    channelTitle: "Tsukumo Sana Ch. hololive-EN",
    channelId: "UCsUj0dszADCGbF3gNrQEuSQ",
  };
  const faunaChannel = {
    channelTitle: "Ceres Fauna Ch. hololive-EN",
    channelId: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
  };
  const mockPlaylistId = "UUO_aKKYxn4tvrqPjcTzZ6EQ";
  const mockThumbnail = "thumbnail-url.png";

  it("makes an api call for the requested youtube channel and stores the returned details", async () => {
    mockYoutubeChannelDetails(sanaChannel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: sanaChannel.channelId,
            snippet: {
              title: sanaChannel.channelTitle,
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

    await storeChannelDetails([sanaChannel]);

    const channels = await selectAllChannels();
    expect(channels).toHaveLength(1);
    expect(channels).toEqual([
      {
        channel_id: sanaChannel.channelId,
        channel_title: sanaChannel.channelTitle,
        thumbnail_url: mockThumbnail,
        upload_playlist_id: mockPlaylistId,
      },
    ]);
  });

  it("makes an api call and returns multiple items when the requested youtube channels contains multiple ids", async () => {
    mockYoutubeChannelDetails([sanaChannel.channelId, faunaChannel.channelId].join(","), {
      responseStatus: 200,
      response: {
        items: [
          {
            id: sanaChannel.channelId,
            snippet: {
              title: sanaChannel.channelTitle,
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
          {
            id: faunaChannel.channelId,
            snippet: {
              title: faunaChannel.channelTitle,
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

    await storeChannelDetails([sanaChannel, faunaChannel]);

    const channels = await selectAllChannels();
    expect(channels).toHaveLength(2);
    expect(channels).toEqual([
      {
        channel_id: sanaChannel.channelId,
        channel_title: sanaChannel.channelTitle,
        thumbnail_url: mockThumbnail,
        upload_playlist_id: mockPlaylistId,
      },
      {
        channel_id: faunaChannel.channelId,
        channel_title: faunaChannel.channelTitle,
        thumbnail_url: mockThumbnail,
        upload_playlist_id: mockPlaylistId,
      },
    ]);
  });

  it("has a max possible channel request count of 50", () => {
    expect(getChannelsDetails.MAX_CHANNELS_DETAILS_REQUEST_COUNT).toBe(50);
  });

  it("makes multiple api calls and returns all requested items when more than 50 channels are requested", async () => {
    const allChannels = new Array(100).fill(null).map(() => ({
      ...faunaChannel,
      channelId: uniqueId().toString(), // must be a unique value every time
    }));

    const maxRequestChannel = getChannelsDetails.MAX_CHANNELS_DETAILS_REQUEST_COUNT;
    const firstChannelsList = allChannels.slice(0, maxRequestChannel);
    const secondChannelsList = allChannels.slice(maxRequestChannel);

    const expectedIdQueryParamForFirst = firstChannelsList
      .map(({ channelId }) => channelId)
      .join(",");
    mockYoutubeChannelDetails(expectedIdQueryParamForFirst, {
      responseStatus: 200,
      response: {
        items: firstChannelsList.slice(0, maxRequestChannel).map((channel) => ({
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
        })),
      },
    });

    const expectedIdQueryParamForSecond = secondChannelsList
      .map(({ channelId }) => channelId)
      .join(",");
    mockYoutubeChannelDetails(expectedIdQueryParamForSecond, {
      responseStatus: 200,
      response: {
        items: secondChannelsList.slice(0, maxRequestChannel).map((channel) => ({
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
        })),
      },
    });

    jest.spyOn(getChannelsDetails, "getChannelsDetails");
    await storeChannelDetails([...firstChannelsList, ...secondChannelsList]);

    const channels = await selectAllChannels();
    expect(channels).toHaveLength(100);
    expect(getChannelsDetails.getChannelsDetails).toHaveBeenCalledTimes(2);
  });

  it("records the last time channel details were stored", async () => {
    expect(await selectLastStoreChannelsDate()).toBe(null);

    mockYoutubeChannelDetails(sanaChannel.channelId, {
      responseStatus: 200,
      response: {
        items: [
          {
            id: sanaChannel.channelId,
            snippet: {
              title: sanaChannel.channelTitle,
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

    await storeChannelDetails([sanaChannel]);

    const currentTime = Date.now();
    const tenSeconds = 1000 * 10;
    const runTime = (await selectLastStoreChannelsDate()).getTime();

    // Confirm time is accurate to within 10 seconds
    expect(runTime).toBeGreaterThan(currentTime - tenSeconds);
    expect(runTime).toBeLessThan(currentTime + tenSeconds);
  });

  it("throws an error if there is an issue fetching the channel details", async () => {
    mockYoutubeChannelDetails(sanaChannel.channelId, {
      responseStatus: 400,
      response: null,
    });

    expect(async () => storeChannelDetails([sanaChannel])).rejects.toBeDefined();
  });
});
