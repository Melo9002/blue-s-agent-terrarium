export function buildReactionMessages(agent, event) {
  return [
    {
      role: "system",
      content: [
        `You are ${agent.name}.`,
        agent.identity,
        "React in character to the supplied event.",
        "Return only a JSON object with these exact fields:",
        "shouldSpeak (boolean), text (string), emotion (string), animation (string or null), memoryCandidates (array of strings).",
        "Keep spoken text to at most two short sentences.",
        "Use an empty text when shouldSpeak is false.",
        "Only propose a memory when the event contains a durable personal fact worth remembering.",
      ].join("\n"),
    },
    {
      role: "user",
      content: JSON.stringify(event),
    },
  ];
}
