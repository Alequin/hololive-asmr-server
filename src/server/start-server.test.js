import { isArray } from "lodash";
import fetch from "node-fetch";
import { setupDatabase } from "../../scripts/setup-database.js";
import { getEnvironmentVariables } from "../config/config.js";
import * as database from "../database/database";
import { seedDatabase } from "../database/maintenance/seed-database.js";
import { truncateDatabase } from "../database/maintenance/truncate-database.js";
import { startServer } from "./start-server.js";

describe("start server", () => {
  const testPort = 3002;
  let server = null;

  beforeAll(async () => {
    await setupDatabase();
  });

  beforeEach(async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);
    await truncateDatabase();
    await seedDatabase();
    server = await startServer({ port: testPort });
  });

  afterEach(async () => {
    await server.closeServer();
    await database.disconnect();
  });

  it("Provides an API to request asmr videos", async () => {
    const response = await fetch(`http://localhost:${testPort}/videos`);

    const videos = await response.json();

    expect(isArray(videos["Okayu Ch. 猫又おかゆ"])).toBe(true);
    expect(isArray(videos["Mori Calliope Ch. hololive-EN"])).toBe(true);
  });
});
