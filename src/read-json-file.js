import fs from "fs";
import path from "path";
import { rootDirPath } from "../root-dir-path.js";

/**
 * Read the json file at the given path
 *
 * - Take care with file paths as they must start from the root directory
 */
export const readJsonFile = (filePath) =>
  JSON.parse(fs.readFileSync(fullFilePath(filePath)).toString());

export const doesJsonFileExist = (filePath) =>
  fs.existsSync(fullFilePath(filePath));

const fullFilePath = (filePath) => path.resolve(rootDirPath, filePath);
