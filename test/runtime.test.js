import test from "node:test";
import assert from "node:assert/strict";
import { agents } from "../src/agents.js";
import { createEvent } from "../src/events.js";
import { MockProvider } from "../src/providers/mock-provider.js";
import { AgentRuntime } from "../src/runtime.js";

test("important events reach both inhabitants", async () => {
  const runtime = new AgentRuntime(new MockProvider());
  const event = createEvent("game.discovery", "test", { text: "A hidden room" }, 0.9);

  for (const agent of Object.values(agents)) {
    const result = await runtime.handle(agent, event);
    assert.equal(result.status, "responded");
    assert.equal(result.provider, "mock");
  }
});

test("noise is ignored by both inhabitants", async () => {
  const runtime = new AgentRuntime(new MockProvider());
  const event = createEvent("game.footstep", "test", { text: "One step" }, 0.1);

  for (const agent of Object.values(agents)) {
    const result = await runtime.handle(agent, event);
    assert.equal(result.status, "ignored");
  }
});
