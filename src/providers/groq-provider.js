import { buildReactionMessages } from "../prompt.js";
import { parseReactionJson } from "../reaction.js";
import { requestJson } from "./http.js";

export class GroqProvider {
  constructor({ baseUrl, apiKey, model, timeoutMs, fetchImpl = fetch }) {
    if (!apiKey) throw new Error("GROQ_API_KEY is required when AGENT_PROVIDER=groq.");
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.model = model;
    this.timeoutMs = timeoutMs;
    this.fetchImpl = fetchImpl;
  }

  get name() {
    return "groq";
  }

  async generate({ agent, event }) {
    const data = await requestJson(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      signal: AbortSignal.timeout(this.timeoutMs),
      body: JSON.stringify({
        model: this.model,
        messages: buildReactionMessages(agent, event),
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    }, this.fetchImpl);

    return parseReactionJson(data?.choices?.[0]?.message?.content);
  }
}
