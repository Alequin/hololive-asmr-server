import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { readChannelIds } from "../src/read-channel-ids";
import { storeAllVideoDetails } from "../src/store-video-details/store-all-video-details";
import { runScript } from "./run-script";

if (require.main === module) {
  runScript("requestVideoData", async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);

    await storeAllVideoDetails(readChannelIds());

    await database.disconnect();
  });
}
