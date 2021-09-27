import { startServer } from "./src/server/start-server";

const port = process.env.PORT || 3000;

(async () => {
  const { expressServer, closeServer } = await startServer({ port });

  console.log("Server running on port", expressServer.address().port);
})();
