const http = require("node:http");
const { readFile } = require("node:fs/promises");
const { join } = require("node:path");
const { pathways, majors, courses, activities } = require("./pathways");
const supported = new Set(pathways.flatMap((path) => path.signals));
const assets = new Map([
  ["/", ["index.html", "text/html"]],
  ["/app.js", ["app.js", "text/javascript"]]
]);

function json(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(data));
}

http.createServer(async (request, response) => {
  const asset = assets.get(request.url);
  if (asset && request.method === "GET") {
    const [file, type] = asset;
    try {
      const content = await readFile(join(__dirname, file));
      response.writeHead(200, { "Content-Type": type + "; charset=utf-8" });
      response.end(content);
    } catch {
      json(response, 500, { error: "Could not load the app" });
    }
    return;
  }
  if (request.url === "/api/v1/assessment" && request.method === "GET") {
    return json(response, 200, Object.fromEntries(majors.map((major) => {
      const signals = [...new Set(pathways.filter((path) => path.major === major).flatMap((path) => path.signals))];
      return [major, {
        Coursework: signals.filter((signal) => courses.has(signal)),
        Skills: signals.filter((signal) => !courses.has(signal) && !activities.has(signal)),
        Activities: signals.filter((signal) => activities.has(signal) && !["Data and databases", "Automotive technology"].includes(signal))
      }];
    })));
  }
  if (request.url !== "/api/v1/recommendations") {
    return json(response, 404, { error: "Unknown route" });
  }
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { error: "Use POST" });
  }
  let body = "";
  request.setEncoding("utf8");
  try {
    for await (const chunk of request.iterator({ destroyOnReturn: false })) {
      body += chunk;
      if (Buffer.byteLength(body) > 8192) {
        response.setHeader("Connection", "close");
        return json(response, 413, { error: "Request too large" });
      }
    }
    const { signals, major } = JSON.parse(body) ?? {};
    if ((major !== undefined && !majors.includes(major)) ||
        !Array.isArray(signals) || !signals.every((signal) => supported.has(signal))) {
      return json(response, 400, { error: "Expected an array of supported signals" });
    }
    const selected = new Set(signals);
    const matches = pathways
      .filter((path) => major === undefined || path.major === major)
      .map(({ signals: criteria, ...path }) => ({
        path,
        reasons: criteria.filter((signal) => selected.has(signal)),
        score: criteria.reduce((score, signal) =>
          score + (selected.has(signal) ? (activities.has(signal) ? 1 : 2) : 0), 0)
      }))
      .filter(({ reasons }) => major !== undefined || reasons.length)
      .sort((a, b) => b.score - a.score);
    return json(response, 200, { matches });
  } catch {
    return json(response, 400, { error: "Expected a JSON body" });
  }
}).listen(4173, "127.0.0.1", () => console.log("Pathways at http://127.0.0.1:4173/"));
