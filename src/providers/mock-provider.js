export class MockProvider {
  get name() {
    return "mock";
  }

  async generate({ agent, event }) {
    const text = event.payload.text ?? JSON.stringify(event.payload);
    return {
      shouldSpeak: true,
      text: `${agent.name} observed “${text}” and wants to respond.`,
      emotion: event.importance >= 0.8 ? "surprised" : "curious",
      animation: event.importance >= 0.8 ? "react" : null,
      memoryCandidates: [],
    };
  }
}
