import { buildReactionMessages } from "../prompt.js";
import { parseReactionJson, reactionJsonSchema } from "../reaction.js";
import { requestJson } from "./http.js";

export class OllamaProvider {
  constructor({ baseUrl, model, timeoutMs, fetchImpl = fetch }) {
    this.baseUrl = baseUrl;
    this.model = model;
    this.timeoutMs = timeoutMs;
    this.fetchImpl = fetchImpl;
  }

  get name() {
    return "ollama";
  }

  async generate({ agent, event }) {
    const data = await requestJson(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(this.timeoutMs),
      body: JSON.stringify({
        model: this.model,
        stream: false,
        think: false,
        format: reactionJsonSchema,
        messages: buildReactionMessages(agent, event),
      }),
    }, this.fetchImpl);

    return parseReactionJson(data?.message?.content);
  }
}
