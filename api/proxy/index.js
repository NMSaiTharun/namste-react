// Proxies /api/dapi/* to Swiggy, mirroring what .proxyrc.json does for the
// Parcel dev server. Needed in production because the browser cannot call
// swiggy.com directly (no CORS headers on their side).
const UPSTREAM = "https://www.swiggy.com";
const TIMEOUT_MS = 20000;

module.exports = async function (context, req) {
  const path = context.bindingData.path || "";
  const queryIndex = req.url.indexOf("?");
  const query = queryIndex === -1 ? "" : req.url.slice(queryIndex);
  const target = `${UPSTREAM}/dapi/${path}${query}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(target, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      signal: controller.signal,
    });

    const body = await upstream.text();
    context.res = {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") || "application/json",
        "cache-control": "public, max-age=60",
      },
      body,
    };
  } catch (error) {
    const timedOut = error.name === "AbortError";
    context.log.error(`Proxy request to ${target} failed:`, error);
    context.res = {
      status: timedOut ? 504 : 502,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: timedOut ? "Upstream request timed out" : "Upstream request failed",
      }),
    };
  } finally {
    clearTimeout(timer);
  }
};
