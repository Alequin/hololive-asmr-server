export const currentDatabaseName = ({
  isEnvLocal,
  isEnvTest,
  isEnvProduction,
}) => {
  if (isEnvTest()) return "test_hololive_asmr";
  if (isEnvLocal()) return "local_hololive_asmr";
  if (isEnvProduction()) return "";
  throw new Error(
    "No database name selected. Are all the environments represented?"
  );
};
