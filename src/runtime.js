import { validateReaction } from "./reaction.js";

export class AgentRuntime {
  constructor(provider) {
    this.provider = provider;
  }

  async handle(agent, event) {
    if (event.importance < agent.reactionThreshold) {
      return {
        agent: agent.name,
        status: "ignored",
        reason: `importance ${event.importance} is below threshold ${agent.reactionThreshold}`,
      };
    }

    const startedAt = performance.now();
    const reaction = validateReaction(await this.provider.generate({ agent, event }));

    return {
      agent: agent.name,
      status: reaction.shouldSpeak ? "responded" : "silent",
      eventId: event.id,
      provider: this.provider.name,
      latencyMs: Math.round(performance.now() - startedAt),
      ...reaction,
    };
  }
}
