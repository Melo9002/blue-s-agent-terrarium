import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { agents } from "../agents.js";
import { createEvent } from "../events.js";
import { AgentRuntime } from "../runtime.js";

const PUBLIC_FILES = new Map([
  ["/", ["../../public/index.html", "text/html; charset=utf-8"]],
  ["/app.js", ["../../public/app.js", "text/javascript; charset=utf-8"]],
  ["/styles.css", ["../../public/styles.css", "text/css; charset=utf-8"]],
]);

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(value));
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 64 * 1024) throw new Error("Request body is too large.");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("Request body must contain valid JSON.");
  }
}

function publicAgent(agent) {
  return {
    id: agent.id,
    name: agent.name,
    identity: agent.identity,
    modes: agent.modes,
    interests: agent.interests,
    reactionThreshold: agent.reactionThreshold,
  };
}

function selectAgents(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return Object.values(agents);
  const selected = ids.map((id) => agents[id]);
  if (selected.some((agent) => !agent)) throw new Error("One or more inhabitant IDs are unknown.");
  return selected;
}

export function createTerrariumServer({ provider }) {
  const runtime = new AgentRuntime(provider);

  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");

      if (request.method === "GET" && url.pathname === "/api/status") {
        return sendJson(response, 200, { name: "Blue's Agent Terrarium", provider: provider.name });
      }
      if (request.method === "GET" && url.pathname === "/api/agents") {
        return sendJson(response, 200, Object.values(agents).map(publicAgent));
      }
      if (request.method === "POST" && url.pathname === "/api/events") {
        const body = await readJson(request);
        const text = typeof body.text === "string" ? body.text.trim() : "";
        const importance = Number(body.importance ?? 0.7);
        if (!text) throw new Error("Event text is required.");
        const event = createEvent(body.type || "user.message", "terrarium-ui", { text }, importance);
        const results = await Promise.all(selectAgents(body.agentIds).map(async (agent) => {
          try {
            return await runtime.handle(agent, event);
          } catch (error) {
            return { agent: agent.name, status: "error", error: error.message };
          }
        }));
        return sendJson(response, 200, { event, results });
      }

      const publicFile = PUBLIC_FILES.get(url.pathname);
      if (request.method === "GET" && publicFile) {
        const [relativePath, contentType] = publicFile;
        const content = await readFile(fileURLToPath(new URL(relativePath, import.meta.url)));
        response.writeHead(200, { "Content-Type": contentType });
        return response.end(content);
      }

      sendJson(response, 404, { error: "Not found." });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
  });
}
