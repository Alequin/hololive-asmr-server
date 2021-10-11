import { readJsonFile } from "../src/read-json-file";

export const readChannelIds = () => readJsonFile("./src/channel-ids.json");
