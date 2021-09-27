import fs from "fs";
import path from "path";
import { rootDirPath } from "../root-dir-path.js";

/**
 * Read the json file at the given path
 *
 * - Take care with file paths as they must start from the root directory
 */
export const readJsonFile = (filePath) =>
  JSON.parse(fs.readFileSync(path.resolve(rootDirPath, filePath)).toString());
