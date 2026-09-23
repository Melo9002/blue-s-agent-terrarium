import { GroqProvider } from "./groq-provider.js";
import { MockProvider } from "./mock-provider.js";
import { OllamaProvider } from "./ollama-provider.js";

export function createProvider(config) {
  if (config.provider === "mock") return new MockProvider();
  if (config.provider === "groq") {
    return new GroqProvider({ ...config.groq, timeoutMs: config.timeoutMs });
  }
  if (config.provider === "ollama") {
    return new OllamaProvider({ ...config.ollama, timeoutMs: config.timeoutMs });
  }
  throw new Error(`No provider factory exists for "${config.provider}".`);
}
