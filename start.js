import { getEnvironmentVariables } from "./src/config/config";
import { startServer } from "./src/server/start-server";

(async () => {
  const { expressServer, closeServer } = await startServer({
    port: getEnvironmentVariables().port,
  });

  console.log("Server running on port", expressServer.address().port);
})();
