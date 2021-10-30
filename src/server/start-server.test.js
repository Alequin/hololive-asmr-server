import { isArray } from "lodash";
import fetch from "node-fetch";
import { setupDatabase } from "../../scripts/setup-database.js";
import { getEnvironmentVariables } from "../config/config.js";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { seedDatabase } from "../database/maintenance/seed-database.js";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { startServer } from "./start-server.js";
import * as videoCache from "./video-cache.js";
import * as selectAllVideosWithChannelDetails from "../database/select-all-videos-with-channel-details";

const environment = getEnvironmentVariables();

describe("start server", () => {
  const testPort = 3002;
  let server = null;

  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.spyOn(videoCache, "newVideoCache");
    jest.spyOn(selectAllVideosWithChannelDetails, "selectAllVideosWithChannelDetails");

    await database.connect(environment.databaseName);
    await truncateDatabase();
    await seedDatabase();
    server = await startServer({ port: testPort });
  });

  afterEach(async () => {
    await server.closeServer();
    await database.disconnect();
  });

  afterAll(async () => {
    await database.connect(environment.databaseName);
    await dropAllDatabaseTables();
    await database.disconnect();
  });

  it("Provides an API to request asmr videos", async () => {
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
  it("Makes a call to prepare the videos in cache on server startup", () => {
    // Make a call to create a new cache
    expect(videoCache.newVideoCache).toHaveBeenCalledTimes(1);

    // Make a call to fetch all videos while creating the cache
    expect(
      selectAllVideosWithChannelDetails.selectAllVideosWithChannelDetails
    ).toHaveBeenCalledTimes(1);
  });
});
