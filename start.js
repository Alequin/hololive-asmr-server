import { getEnvironmentVariables } from "./src/config/config";
import * as database from "./src/database/database";
import { logger } from "./src/logger";
import { onProcessEnd } from "./src/on-process-end";
import { startServer } from "./src/server/start-server";

(async () => {
  const environment = getEnvironmentVariables();
  await database.connect(environment.databaseName);
  const { expressServer, closeServer } = await startServer({
    port: getEnvironmentVariables().port,
  });

  logger.info("Server running on port", expressServer.address().port);

  onProcessEnd(async (closeEventType) => {
    logger.info(`${closeEventType} received, closing down`);
    await closeServer();
    await database.disconnect();
    logger.info(`${closeEventType} complete`);
  });
})();
