import express from "express";
import helmet from "helmet";
import * as videos from "./routes/get/videos.js";

export const startServer = async ({ port }) =>
  new Promise(async (resolve) => {
    const app = express();
    app.use(helmet());

    // parse application/json
    app.use(express.json());

    app.get("/_health", async (_req, res) => res.send("👍"));

    app.get(videos.path, videos.getVideos());

    const server = app.listen(port, () => {
      let hasClosed = false;
      resolve({
        expressServer: server,
        closeServer: async () => {
          if (hasClosed) return;
          hasClosed = true;
          await new Promise((resolve) => server.close(resolve));
        },
      });
    });
  });
