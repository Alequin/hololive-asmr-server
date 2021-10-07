import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { selectAllVideos } from "../src/database/select-all-videos";
import { runScript } from "./run-script";
import fs from "fs";
import { orderBy } from "lodash";

if (require.main === module) {
  runScript("saveLocalVideoDataAsJson", async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);

    const allVideos = await selectAllVideos();
    fs.writeFileSync(
      `seed-data-${Date.now()}.json`,
      JSON.stringify(orderBy(allVideos, "published_at", "desc"), null, 2)
    );

    await database.disconnect();
  });
}
