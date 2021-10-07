import { getEnvironmentVariables } from "./config/config";

export const logger = {
  info: (...args) => {
    if (shouldBeSilent()) return;
    console.log(args);
  },
  error: (...args) => {
    if (shouldBeSilent()) return;
    console.error(args);
  },
  count: (...args) => {
    if (shouldBeSilent()) return;
    console.count(args);
  },
};

const shouldBeSilent = () => getEnvironmentVariables().isEnvTest();
