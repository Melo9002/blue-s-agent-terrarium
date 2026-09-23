import test from "node:test";
import assert from "node:assert/strict";
import { agents } from "../src/agents.js";
import { readConfig } from "../src/config.js";
import { createEvent } from "../src/events.js";
import { GroqProvider } from "../src/providers/groq-provider.js";
import { MockProvider } from "../src/providers/mock-provider.js";
import { OllamaProvider } from "../src/providers/ollama-provider.js";
import { validateReaction } from "../src/reaction.js";
import { AgentRuntime } from "../src/runtime.js";

const reaction = {
  shouldSpeak: true,
  text: "Hi!",
  emotion: "friendly",
  animation: "wave",
  memoryCandidates: [],
};

function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("important events reach both inhabitants", async () => {
  const runtime = new AgentRuntime(new MockProvider());
  const event = createEvent("game.discovery", "test", { text: "A hidden room" }, 0.9);
  for (const agent of Object.values(agents)) {
    const result = await runtime.handle(agent, event);
    assert.equal(result.status, "responded");
    assert.equal(result.provider, "mock");
    assert.equal(typeof result.shouldSpeak, "boolean");
  }
});

test("noise is ignored by both inhabitants", async () => {
  const runtime = new AgentRuntime(new MockProvider());
  const event = createEvent("game.footstep", "test", { text: "One step" }, 0.1);
  for (const agent of Object.values(agents)) {
    assert.equal((await runtime.handle(agent, event)).status, "ignored");
  }
});

test("reaction validation rejects silent text", () => {
  assert.throws(() => validateReaction({ ...reaction, shouldSpeak: false }), /empty text/);
});

test("configuration defaults to the mock provider", () => {
  assert.equal(readConfig({}).provider, "mock");
});

test("Ollama adapter parses a structured reaction", async () => {
  const fetchImpl = async (url, options) => {
    assert.equal(url, "http://localhost:11434/api/chat");
    assert.equal(JSON.parse(options.body).model, "qwen3:1.7b");
    return jsonResponse({ message: { content: JSON.stringify(reaction) } });
  };
  const provider = new OllamaProvider({
    baseUrl: "http://localhost:11434",
    model: "qwen3:1.7b",
    timeoutMs: 1000,
    fetchImpl,
  });
  assert.deepEqual(await provider.generate({ agents: agents.pixihex, agent: agents.pixihex, event: createEvent("test", "test", {}, 1) }), reaction);
});

test("Groq adapter sends its key without exposing it in output", async () => {
  const fetchImpl = async (url, options) => {
    assert.equal(url, "https://api.groq.com/openai/v1/chat/completions");
    assert.equal(options.headers.Authorization, "Bearer secret-test-key");
    return jsonResponse({ choices: [{ message: { content: JSON.stringify(reaction) } }] });
  };
  const provider = new GroqProvider({
    baseUrl: "https://api.groq.com/openai/v1",
    apiKey: "secret-test-key",
    model: "openai/gpt-oss-20b",
    timeoutMs: 1000,
    fetchImpl,
  });
  assert.deepEqual(await provider.generate({ agent: agents.pixihex, event: createEvent("test", "test", {}, 1) }), reaction);
});
