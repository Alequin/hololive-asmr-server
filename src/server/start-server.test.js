import { isArray } from "lodash";
import fetch from "node-fetch";
import { setupDatabase } from "../../scripts/setup-database.js";
import { getEnvironmentVariables } from "../config/config.js";
import * as database from "../database/database";
import { seedDatabase } from "../database/maintenance/seed-database.js";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { startServer } from "./start-server.js";
import * as selectAllVideos from "../database/select-all-videos";
import { cacheLiftSpan } from "./in-memory-cache.js";
import { delay } from "../delay.js";

const environment = getEnvironmentVariables();

describe("start server", () => {
  const testPort = 3002;
  let server = null;

  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();

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
    });
  });

  it("Returns cached videos on the second request", async () => {
    const selectAllVideosSpy = jest.spyOn(selectAllVideos, "selectAllVideos");

    await fetch(`http://localhost:${testPort}/videos`, {
      headers: { authToken: environment.serverAuthToken },
    });
    // Calls the database
    expect(selectAllVideosSpy).toHaveBeenCalledTimes(1);

    await fetch(`http://localhost:${testPort}/videos`, {
      headers: { authToken: environment.serverAuthToken },
    });
    // Does not increase the times the database has been called the second time
    expect(selectAllVideosSpy).toHaveBeenCalledTimes(1);
  });

  it("Refreshes the cache after the timeout period has passed", async () => {
    const selectAllVideosSpy = jest.spyOn(selectAllVideos, "selectAllVideos");

    await fetch(`http://localhost:${testPort}/videos`, {
      headers: { authToken: environment.serverAuthToken },
    });
    // Calls the database
    expect(selectAllVideosSpy).toHaveBeenCalledTimes(1);

    await fetch(`http://localhost:${testPort}/videos`, {
      headers: { authToken: environment.serverAuthToken },
    });
    // Does not increase the times the database has been called the second time
    expect(selectAllVideosSpy).toHaveBeenCalledTimes(1);

    await delay(cacheLiftSpan);

    await fetch(`http://localhost:${testPort}/videos`, {
      headers: { authToken: environment.serverAuthToken },
    });
    // Make another database call after the cache has timed out
    expect(selectAllVideosSpy).toHaveBeenCalledTimes(2);
  });
});
