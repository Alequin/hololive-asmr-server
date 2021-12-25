import express from "express";
import helmet from "helmet";
import { readChannelIds } from "../read-channel-ids.js";
import { isAuthTokenValid } from "./is-auto-token-valid.js";
import * as videos from "./routes/get/videos.js";
import * as channels from "./routes/get/channels";
import { newVideoCache } from "./video-cache.js";
import { watchForNewVideos } from "./watch-for-new-videos";

export const startServer = async ({ port }) =>
  new Promise(async (resolve) => {
    const app = express();
    app.use(helmet());

    // parse application/json
    app.use(express.json());

    app.use((req, res, next) => {
      if (isAuthTokenValid(req.header("authToken"))) return next();

      res.status(401);
      res.send("Invalid authorization");
    });

    app.get("/_health", async (_req, res) => res.send("👍"));

    const videoCache = newVideoCache();
    await videoCache.update();

    app.get(videos.path, videos.getVideos(videoCache));
    app.get(channels.path, channels.getChannels(videoCache));

    watchForNewVideos(readChannelIds(), videoCache);

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
