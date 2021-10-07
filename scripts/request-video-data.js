import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { storeVideoDetails } from "../src/store-video-details/store-video-details";
import { runScript } from "./run-script";

if (require.main === module) {
  runScript("requestVideoData", async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);

    await storeVideoDetails(readJsonFile("./src/channel-ids.json"));

    await database.disconnect();
  });
}
