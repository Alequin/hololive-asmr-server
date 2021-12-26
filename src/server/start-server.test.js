jest.mock("./watch-for-new-videos");

import { isArray, orderBy } from "lodash";
import fetch from "node-fetch";
import waitForExpect from "wait-for-expect";
import { setupDatabase } from "../../scripts/setup-database.js";
import { getEnvironmentVariables } from "../config/config.js";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { seedDatabase } from "../database/maintenance/seed-database.js";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import * as selectAllVideosWithChannelDetails from "../database/select-all-videos-with-channel-details";
import { upsertLastStoreAllVideosDate } from "../database/upsert-last-store-all-videos-date.js";
import { upsertLastStoreChannelDetails } from "../database/upsert-last-store-channel-details.js";
import { upsertLastStoreRecentVideosDate } from "../database/upsert-last-store-recent-videos-date.js";
import { startServer } from "./start-server.js";
import * as videoCache from "./video-cache.js";
import * as watchForNewVideos from "./watch-for-new-videos";

const environment = getEnvironmentVariables();

describe("start server", () => {
  const testPort = 3002;
  let server = null;

  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(videoCache.staticVideoCache, "get");
    jest.spyOn(videoCache.staticVideoCache, "update");
    jest.spyOn(watchForNewVideos, "watchForNewVideos");
    jest.spyOn(
      selectAllVideosWithChannelDetails,
      "selectAllVideosWithChannelDetails"
    );

    await database.connect(environment.databaseName);
    await truncateDatabase();
    await seedDatabase();

    // Fake recent updates of fetched data to stop test from actaully fetching
    await upsertLastStoreChannelDetails(new Date());
    await upsertLastStoreAllVideosDate(new Date());
    await upsertLastStoreRecentVideosDate(new Date());

    videoCache.staticVideoCache.reset();
  });

  afterEach(async () => {
    await server?.closeServer();
    server = null;
    await database.disconnect();
  });

  afterAll(async () => {
    await database.connect(environment.databaseName);
    await dropAllDatabaseTables();
    await database.disconnect();
  });

  describe("get videos", () => {
    it("Provides an API to request asmr videos", async () => {
      server = await startServer({ port: testPort });

      const response = await fetch(`http://localhost:${testPort}/videos`, {
        headers: { authToken: environment.serverAuthToken },
      });

      const videos = await response.json();

      expect(isArray(videos)).toBe(true);
      videos.forEach((video) => {
        expect(typeof video.video_id).toBe("string");
        expect(typeof video.channel_title).toBe("string");
        expect(typeof video.video_title).toBe("string");
        expect(typeof video.channel_id).toBe("string");
        expect(typeof video.published_at).toBe("string");
        expect(typeof video.video_thumbnail_url).toBe("string");
        expect(typeof video.channel_thumbnail_url).toBe("string");
      });
    });

    it("returns only the videos with the channel ids gived in the query string", async () => {
      server = await startServer({ port: testPort });

      const response = await fetch(
        `http://localhost:${testPort}/videos?channelIds=UCvInZx9h3jC2JzsIzoOebWg,UCUKD-uaobj9jiqB-VXt71mA,UCoSrY_IQQVpmIRZ9Xf-y93g`,
        {
          headers: { authToken: environment.serverAuthToken },
        }
      );

      const videos = await response.json();

      expect(isArray(videos)).toBe(true);
      videos.forEach((video) => {
        expect(
          [
            "UCvInZx9h3jC2JzsIzoOebWg",
            "UCUKD-uaobj9jiqB-VXt71mA",
            "UCoSrY_IQQVpmIRZ9Xf-y93g",
          ].includes(video.channel_id)
        ).toBe(true);
      });
    });

    it("returns videos ordered by the requested key", async () => {
      server = await startServer({ port: testPort });

      const response = await fetch(
        `http://localhost:${testPort}/videos?orderByKey=published_at`,
        {
          headers: { authToken: environment.serverAuthToken },
        }
      );

      const videos = await response.json();

      const orderedVideos = orderBy(videos, "published_at");
      expect(videos).toEqual(orderedVideos);
    });

    it("returns the videos in the requested order", async () => {
      server = await startServer({ port: testPort });

      const response = await fetch(
        `http://localhost:${testPort}/videos?orderByKey=published_at&orderDirection=desc`,
        {
          headers: { authToken: environment.serverAuthToken },
        }
      );

      const videos = await response.json();

      const orderedVideos = orderBy(videos, "published_at", "desc");
      expect(videos).toEqual(orderedVideos);
    });

    it("returns the requested number of videos", async () => {
      server = await startServer({ port: testPort });

      const response = await fetch(
        `http://localhost:${testPort}/videos?max=20`,
        {
          headers: { authToken: environment.serverAuthToken },
        }
      );

      const videos = await response.json();
      expect(videos.length).toBe(20);
    });

    it("returns vidoes offset by the requested number", async () => {
      server = await startServer({ port: testPort });

      // Make a request for the top 20
      const top20Response = await fetch(
        `http://localhost:${testPort}/videos?max=20`,
        {
          headers: { authToken: environment.serverAuthToken },
        }
      );

      const top20videos = await top20Response.json();

      // Make a request for the next 20
      const next20Response = await fetch(
        `http://localhost:${testPort}/videos?max=20&offset=20`,
        {
          headers: { authToken: environment.serverAuthToken },
        }
      );

      const next20videos = await next20Response.json();

      // Make a request for the top 40
      const top40Response = await fetch(
        `http://localhost:${testPort}/videos?max=40`,
        {
          headers: { authToken: environment.serverAuthToken },
        }
      );

      const top40videos = await top40Response.json();

      // Confirm the first two request return the same as fetching the top 40

      expect([...top20videos, ...next20videos].length).toEqual(
        top40videos.length
      );
      expect([...top20videos, ...next20videos]).toEqual(top40videos);
    });

    it("returns the expected status code if there is an issue requesting videos", async () => {
      jest
        .spyOn(
          selectAllVideosWithChannelDetails,
          "selectAllVideosWithChannelDetails"
        )
        .mockImplementation(() => {
          throw "error selectAllVideosWithChannelDetails";
        });

      server = await startServer({ port: testPort });

      const response = await fetch(`http://localhost:${testPort}/videos`, {
        headers: { authToken: environment.serverAuthToken },
      });

      expect(response.status).toBe(500);
    });
  });

  describe("get channels", () => {
    it("Provides an API to request all the youtube channels", async () => {
      server = await startServer({ port: testPort });

      const response = await fetch(`http://localhost:${testPort}/channels`, {
        headers: { authToken: environment.serverAuthToken },
      });

      const channels = await response.json();

      expect(isArray(channels)).toBe(true);
      channels.forEach((channel) => {
        expect(typeof channel.channel_id).toBe("string");
        expect(typeof channel.channel_thumbnail_url).toBe("string");
        expect(typeof channel.channel_thumbnail_url).toBe("string");
      });
    });

    it("returns channels in ascending title order", async () => {
      server = await startServer({ port: testPort });

      const response = await fetch(`http://localhost:${testPort}/channels`, {
        headers: { authToken: environment.serverAuthToken },
      });

      const channels = await response.json();

      const orderedChannels = orderBy(channels, "channel_title");
      expect(orderedChannels).toEqual(channels);
    });

    it("does not use the video cache to get youtube channels if the cache has not updated since the last time a call was made", async () => {
      server = await startServer({ port: testPort });

      expect(videoCache.staticVideoCache.get).toHaveBeenCalledTimes(0);

      // Make first request
      await fetch(`http://localhost:${testPort}/channels`, {
        headers: { authToken: environment.serverAuthToken },
      });

      // Confirm video cache was used to request channels
      expect(videoCache.staticVideoCache.get).toHaveBeenCalledTimes(1);

      // Make second request
      const response = await fetch(`http://localhost:${testPort}/channels`, {
        headers: { authToken: environment.serverAuthToken },
      });

      // Confirm video cache was not used the second time
      expect(videoCache.staticVideoCache.get).toHaveBeenCalledTimes(1);

      // Confirm the response is as expected
      const channels = await response.json();
      expect(isArray(channels)).toBe(true);
      channels.forEach((channel) => {
        expect(typeof channel.channel_title).toBe("string");
        expect(typeof channel.channel_thumbnail_url).toBe("string");
      });
    });

    it("uses the video cache to get youtube channels if the cache was updated since the last time a call was made", async () => {
      server = await startServer({ port: testPort });

      expect(videoCache.staticVideoCache.get).toHaveBeenCalledTimes(0);

      // Make first request
      await fetch(`http://localhost:${testPort}/channels`, {
        headers: { authToken: environment.serverAuthToken },
      });

      // Confirm video cache was used to request channels
      expect(videoCache.staticVideoCache.get).toHaveBeenCalledTimes(1);

      // Update the cache
      await videoCache.staticVideoCache.update();

      // Make second request
      const response = await fetch(`http://localhost:${testPort}/channels`, {
        headers: { authToken: environment.serverAuthToken },
      });

      // Confirm video cache was used the second time
      expect(videoCache.staticVideoCache.get).toHaveBeenCalledTimes(2);

      // Confirm the response is as expected
      const channels = await response.json();
      expect(isArray(channels)).toBe(true);
      channels.forEach((channel) => {
        expect(typeof channel.channel_title).toBe("string");
        expect(typeof channel.channel_thumbnail_url).toBe("string");
      });
    });

    it("returns the expected status code if there is an issue requesting youtube channels", async () => {
      jest
        .spyOn(
          selectAllVideosWithChannelDetails,
          "selectAllVideosWithChannelDetails"
        )
        .mockImplementation(() => {
          throw "error selectAllVideosWithChannelDetails";
        });

      server = await startServer({ port: testPort });

      const response = await fetch(`http://localhost:${testPort}/channels`, {
        headers: { authToken: environment.serverAuthToken },
      });

      expect(response.status).toBe(500);
    });
  });

  it("prepares the videos in cache on server startup", async () => {
    server = await startServer({ port: testPort });

    // Make a call to populate cache
    expect(videoCache.staticVideoCache.update).toHaveBeenCalledTimes(1);

    // Make a call to fetch all videos while creating the cache
    expect(
      selectAllVideosWithChannelDetails.selectAllVideosWithChannelDetails
    ).toHaveBeenCalledTimes(1);
  });

  it("starts watching for updated videos on server startup", async () => {
    server = await startServer({ port: testPort });

    expect(watchForNewVideos.watchForNewVideos).toHaveBeenCalledTimes(1);
  });
});
