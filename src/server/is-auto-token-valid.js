import { isNil } from "lodash";
import { getEnvironmentVariables } from "../config/config";

const { serverAuthToken } = getEnvironmentVariables();

export const isAuthTokenValid = (authToken) => !isNil(authToken) && serverAuthToken === authToken;
