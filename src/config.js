import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnvFile } from "node:process";

const SUPPORTED_PROVIDERS = new Set(["mock", "groq", "ollama"]);

export function loadLocalEnvironment(path = resolve(".env")) {
  if (existsSync(path)) loadEnvFile(path);
}

export function readConfig(env = process.env) {
  const provider = (env.AGENT_PROVIDER ?? "mock").trim().toLowerCase();
  if (!SUPPORTED_PROVIDERS.has(provider)) {
    throw new Error(`Unsupported AGENT_PROVIDER "${provider}". Use mock, groq, or ollama.`);
  }

  const timeoutMs = Number(env.MODEL_TIMEOUT_MS ?? 30_000);
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new Error("MODEL_TIMEOUT_MS must be a positive number.");
  }

  return {
    provider,
    timeoutMs,
    groq: {
      apiKey: env.GROQ_API_KEY?.trim(),
      model: env.GROQ_MODEL?.trim() || "openai/gpt-oss-20b",
      baseUrl: (env.GROQ_BASE_URL?.trim() || "https://api.groq.com/openai/v1").replace(/\/$/, ""),
    },
    ollama: {
      model: env.OLLAMA_MODEL?.trim() || "qwen3:1.7b",
      baseUrl: (env.OLLAMA_BASE_URL?.trim() || "http://localhost:11434").replace(/\/$/, ""),
    },
  };
}
