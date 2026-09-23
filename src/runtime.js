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

    const response = await this.provider.generate({ agent, event });

    return {
      agent: agent.name,
      status: "responded",
      eventId: event.id,
      ...response,
    };
  }
}
