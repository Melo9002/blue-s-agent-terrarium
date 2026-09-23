import test from "node:test";
import assert from "node:assert/strict";
import { MockProvider } from "../src/providers/mock-provider.js";
import { createTerrariumServer } from "../src/web/server.js";

async function withServer(run) {
  const server = createTerrariumServer({ provider: new MockProvider() });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test("dashboard host exposes status and inhabitants", async () => {
  await withServer(async (baseUrl) => {
    const status = await (await fetch(`${baseUrl}/api/status`)).json();
    const inhabitants = await (await fetch(`${baseUrl}/api/agents`)).json();
    assert.equal(status.provider, "mock");
    assert.deepEqual(inhabitants.map((agent) => agent.id), ["pixihex", "basilisk"]);
  });
});

test("dashboard dispatches an event to a selected inhabitant", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Hi", importance: 0.8, agentIds: ["pixihex"] }),
    });
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.equal(data.results.length, 1);
    assert.equal(data.results[0].agent, "PixiHex");
    assert.equal(data.results[0].status, "responded");
  });
});

test("dashboard rejects empty events", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "" }),
    });
    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /required/);
  });
});
