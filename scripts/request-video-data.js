import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { readJsonFile } from "../src/read-json-file";
import { storeAllVideoDetails } from "../src/store-video-details/store-all-video-details";
import { runScript } from "./run-script";

if (require.main === module) {
  runScript("requestVideoData", async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);

    await storeAllVideoDetails(readJsonFile("./scripts/channel-ids.json"));

    await database.disconnect();
  });
}
