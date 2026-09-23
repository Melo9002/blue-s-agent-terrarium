export async function requestJson(url, options, fetchImpl = fetch) {
  let response;
  try {
    response = await fetchImpl(url, options);
  } catch (error) {
    if (error?.name === "TimeoutError" || error?.name === "AbortError") {
      throw new Error(`Model request timed out while contacting ${url}.`);
    }
    throw new Error(`Could not contact ${url}: ${error.message}`);
  }

  const body = await response.text();
  let data;
  try {
    data = body ? JSON.parse(body) : {};
  } catch {
    throw new Error(`Model service returned non-JSON data with HTTP ${response.status}.`);
  }

  if (!response.ok) {
    const detail = data?.error?.message ?? data?.error ?? data?.message ?? response.statusText;
    throw new Error(`Model service returned HTTP ${response.status}: ${detail}`);
  }
  return data;
}
