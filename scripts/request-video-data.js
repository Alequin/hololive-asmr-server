import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { readJsonFile } from "../src/read-json-file";
import { storeVideoDetails } from "../src/store-video-details/store-video-details";
import { runScript } from "./run-script";

if (require.main === module) {
  runScript("requestVideoData", async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);

    await storeVideoDetails(readJsonFile("./scripts/channel-ids.json"));

    await database.disconnect();
  });
}
