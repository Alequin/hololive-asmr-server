import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { readChannelIds } from "../src/read-channel-ids";
import { storeChannelDetails } from "../src/store-channel-details/store-channel-details";
import { runScript } from "./run-script";

if (require.main === module) {
  runScript("requestChannelData", async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);

    await storeChannelDetails(readChannelIds());

    await database.disconnect();
  });
}
