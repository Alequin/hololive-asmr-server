import { logger } from "../src/logger";

export const runScript = async (scriptName, callbackToRun) => {
  logger.info(`Starting ${scriptName}`);
  try {
    await callbackToRun();
    logger.info(`Finished ${scriptName}`);
    process.exit();
  } catch (error) {
    logger.error(`Error ${scriptName}`);
    logger.error(error);
    process.exit(1);
  }
};
