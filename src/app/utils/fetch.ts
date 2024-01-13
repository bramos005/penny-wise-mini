export const fetchUtil = async (url: string, config: RequestInit = {}) => {
  try {
    const res = await fetch(url, config);
    const { ok, status, statusText } = res;
    if (!ok) throw new Error(`fetch error: ${status}, ${statusText}`);

    return [await res.json(), null];
  } catch (err) {
    console.warn(err);
    return [null, err];
  }
};
