import { getEnvironmentVariables } from "../config/config";

export const newCache = () => {
  const cache = {};

  return {
    add: (key, value) =>
      (cache[key] = { value, timeout: getCacheTimeoutTime() }),
    get: (key) => {
      const cachedValue = cache[key];
      return {
        ...cachedValue,
        hasTimedOut: cachedValue?.timeout
          ? Date.now() > cachedValue.timeout
          : true,
      };
    },
  };
};

const environment = getEnvironmentVariables();
export const cacheLiftSpan = environment.isEnvProduction() ? 60_000 : 2_000;
const getCacheTimeoutTime = () => Date.now() + cacheLiftSpan;
