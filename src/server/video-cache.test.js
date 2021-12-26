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
    jest.restoreAllMocks();
    jest.clearAllMocks();
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
    expect(typeof cache.lastUpdateTime).toBe("function");
    expect(typeof cache.reset).toBe("function");
    expect(size(cache)).toBe(4);
  });

  it("has no last updated date on creation", () => {
    expect(newVideoCache().lastUpdateTime()).toBe(null);
  });

  it("populates the cache when getting the data from cache but there is nothing available", async () => {
    const selectVideosSpy = jest.spyOn(
      selectAllVideosWithChannelDetails,
      "selectAllVideosWithChannelDetails"
    );

    const cache = newVideoCache();

    // Call get to populate cache and confirm a db call is made to get videos when update is called
    expect(selectVideosSpy).toHaveBeenCalledTimes(0);
    const oneSecondBeforeUpdate = Date.now() - 1000;
    const cachedVideos = await cache.get();
    const oneSecondAfterUpdate = Date.now() + 1000;
    expect(selectVideosSpy).toHaveBeenCalledTimes(1);

    // Confirm the cache is populated
    expect(Array.isArray(cachedVideos)).toBe(true);
    expect(cachedVideos.length).toBeGreaterThan(0);

    // Confirm the lastUpdateTime has been set
    const lastUpdateTime = cache.lastUpdateTime();
    expect(lastUpdateTime).toBeGreaterThan(oneSecondBeforeUpdate);
    expect(lastUpdateTime).toBeLessThan(oneSecondAfterUpdate);
  });

  it("returns the cached data without making another db call when get is called a second time", async () => {
    const selectVideosSpy = jest.spyOn(
      selectAllVideosWithChannelDetails,
      "selectAllVideosWithChannelDetails"
    );

    const cache = newVideoCache();

    // Confirm a db call is made to populate cache
    expect(selectVideosSpy).toHaveBeenCalledTimes(0);
    await cache.get();
    expect(selectVideosSpy).toHaveBeenCalledTimes(1);

    // Confirm no db call is made the second time cache is accessed
    await cache.get();
    expect(selectVideosSpy).toHaveBeenCalledTimes(1);
  });

  it("populates the cache when update is called", async () => {
    const selectVideosSpy = jest.spyOn(
      selectAllVideosWithChannelDetails,
      "selectAllVideosWithChannelDetails"
    );

    const cache = newVideoCache();

    // Confirm a db call is made to get videos when update is called
    expect(selectVideosSpy).toHaveBeenCalledTimes(0);
    const oneSecondBeforeUpdate = Date.now() - 1000;
    await cache.update();
    const oneSecondAfterUpdate = Date.now() + 1000;
    expect(selectVideosSpy).toHaveBeenCalledTimes(1);

    // Confirm the cache is populated
    const cachedVideos = await cache.get();
    expect(Array.isArray(cachedVideos)).toBe(true);
    expect(cachedVideos.length).toBeGreaterThan(0);

    // Confirm the lastUpdateTime has been set
    const lastUpdateTime = cache.lastUpdateTime();
    expect(lastUpdateTime).toBeGreaterThan(oneSecondBeforeUpdate);
    expect(lastUpdateTime).toBeLessThan(oneSecondAfterUpdate);
  });

  it("updates the lastUpdateTime when update is called multiple times", async () => {
    const cache = newVideoCache();

    await cache.update();
    const firstUpdateTime = cache.lastUpdateTime();

    await cache.update();
    const secondUpdateTime = cache.lastUpdateTime();

    expect(secondUpdateTime).toBeGreaterThan(firstUpdateTime);
  });

  it("throws an error if there is an issue while requesting cached data", async () => {
    const selectVideosSpy = jest.spyOn(
      selectAllVideosWithChannelDetails,
      "selectAllVideosWithChannelDetails"
    );

    const cache = newVideoCache();

    selectVideosSpy.mockImplementation(() => {
      throw "error selectVideosSpy";
    });

    expect(cache.get()).rejects.toBe("error selectVideosSpy");
  });

  it("does not throw an error if there is an issue while updating cached data", async () => {
    const selectVideosSpy = jest.spyOn(
      selectAllVideosWithChannelDetails,
      "selectAllVideosWithChannelDetails"
    );

    const cache = newVideoCache();

    selectVideosSpy.mockImplementation(() => {
      throw "error selectVideosSpy";
    });

    expect(cache.update()).resolves.toBe(undefined);
  });

  it("removes data from cache when reset is called", async () => {
    const selectVideosSpy = jest.spyOn(
      selectAllVideosWithChannelDetails,
      "selectAllVideosWithChannelDetails"
    );

    const cache = newVideoCache();

    // Confirm the cache is populated
    expect(Array.isArray(await cache.get())).toBe(true);
    expect(selectVideosSpy).toHaveBeenCalledTimes(1);

    // Confirm the lastUpdateTime has been set
    expect(cache.lastUpdateTime()).toBeTruthy();

    // Reset cache
    cache.reset();

    // Confirm lastUpdateTime is null
    expect(cache.lastUpdateTime()).toBe(null);

    // Request cache data and confirm the database call was made to populate the cache
    expect(Array.isArray(await cache.get())).toBe(true);
    expect(selectVideosSpy).toHaveBeenCalledTimes(2);
  });
});
