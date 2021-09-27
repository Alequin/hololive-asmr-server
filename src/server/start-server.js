import express from "express";
import helmet from "helmet";

export const startServer = async ({ port }) =>
  new Promise(async (resolve) => {
    const app = express();
    app.use(helmet());

    // parse application/json
    app.use(express.json());

    app.get("/_health", async (_req, res) => res.send("👍"));

    const server = app.listen(port, () => {
      let hasClosed = false;
      resolve({
        expressServer: server,
        closeServer: async () => {
          if (hasClosed) return;
          hasClosed = true;
        },
      });
    });
  });
