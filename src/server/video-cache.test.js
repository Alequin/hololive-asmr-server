import { size } from "lodash";
import { setupDatabase } from "../../scripts/setup-database.js";
import { getEnvironmentVariables } from "../config/config";
import * as database from "../database/database";
import { dropAllDatabaseTables } from "../database/maintenance/drop-all-database-tables";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { newVideoCache } from "./video-cache";
import * as selectAllVideosWithChannelDetails from "../database/select-all-videos-with-channel-details";
import { seedDatabase } from "../database/maintenance/seed-database";

const { databaseName } = getEnvironmentVariables();

describe("video cache", () => {
  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    await database.connect(databaseName);
    await truncateDatabase();
    await seedDatabase();
  });

  afterEach(async () => {
    await database.disconnect();
  });

  afterAll(async () => {
    await database.connect(databaseName);
    await dropAllDatabaseTables();
    await database.disconnect();
  });

  it("can create a new cache which exposes the expected functions", () => {
    const cache = newVideoCache();

    expect(typeof cache.get).toBe("function");
    expect(typeof cache.update).toBe("function");
    expect(size(cache)).toBe(2);
  });

  it("has no data in the cache on creation", () => {
    expect(newVideoCache().get()).toEqual([]);
  });

  it("populates the cache when update is called", async () => {
    const selectVideosSpy = jest.spyOn(
      selectAllVideosWithChannelDetails,
      "selectAllVideosWithChannelDetails"
    );

    const cache = newVideoCache();

    expect(cache.get()).toEqual([]);

    // Confirm a db call is made to get videos when update is called
    expect(selectVideosSpy).toHaveBeenCalledTimes(0);
    await cache.update();
    expect(selectVideosSpy).toHaveBeenCalledTimes(1);

    // Confirm the cache is populated
    const cachedVideos = cache.get();
    expect(Array.isArray(cachedVideos)).toBe(true);
    expect(cachedVideos.length).toBeGreaterThan(0);
  });
});
