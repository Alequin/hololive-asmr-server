import { createDatabase } from "../database/create-database.js";
import { truncateDatabase } from "../database/truncate-database.js";
import { startServer } from "./start-server.js";
import fetch from "node-fetch";
import { isArray } from "lodash";
import { seedDatabase } from "../database/seed-database.js";

describe("start server", () => {
  const testPort = 3002;
  let server = null;

  beforeAll(async () => {
    await createDatabase();
  });

  beforeEach(async () => {
    await seedDatabase();
    server = await startServer({ port: testPort });
  });

  afterEach(async () => {
    await server.closeServer();
    await truncateDatabase();
  });

  it("Provides an API to request asmr videos", async () => {
    const response = await fetch(`http://localhost:${testPort}/videos`);

    const videos = await response.json();

    expect(isArray(videos["Okayu Ch. 猫又おかゆ"])).toBe(true);
    expect(isArray(videos["Mori Calliope Ch. hololive-EN"])).toBe(true);
  });
});
