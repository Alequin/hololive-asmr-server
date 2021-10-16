import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { selectAllVideos } from "../src/database/select-all-videos";
import { runScript } from "./run-script";
import fs from "fs";
import { orderBy } from "lodash";
import { selectAllChannels } from "../src/database/select-all-channels";

if (require.main === module) {
  runScript("saveLocalVideoDataAsJson", async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);

    const allChannels = await selectAllChannels();
    const allVideos = orderBy(await selectAllVideos(), "published_at", "desc");
    fs.writeFileSync(
      `seed-data-${Date.now()}.json`,
      JSON.stringify({ allChannels, allVideos }, null, 2)
    );

    await database.disconnect();
  });
}
