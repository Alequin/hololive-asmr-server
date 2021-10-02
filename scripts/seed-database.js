import { getEnvironmentVariables } from "../src/config/config";
import * as database from "../src/database/database";
import { seedDatabase } from "../src/database/maintenance/seed-database";
import { runScript } from "./run-script";

if (require.main === module) {
  runScript("seedDatabase", async () => {
    const environment = getEnvironmentVariables();
    await database.connect(environment.databaseName);
    await seedDatabase();
    await database.disconnect();
  });
}
