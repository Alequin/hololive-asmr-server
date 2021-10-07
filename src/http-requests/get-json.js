import fetch from "node-fetch";

export const getJson = async ({ url, headers }) => {
  const response = await fetch(url, { headers });

  const isErrorStatus = response.status >= 400;
  return {
    status: response.status,
    data: !isErrorStatus ? await response.json() : null,
    error: isErrorStatus ? await response.text() : null,
  };
};
