export const reactionJsonSchema = {
  type: "object",
  properties: {
    shouldSpeak: { type: "boolean" },
    text: { type: "string" },
    emotion: { type: "string" },
    animation: { anyOf: [{ type: "string" }, { type: "null" }] },
    memoryCandidates: { type: "array", items: { type: "string" } },
  },
  required: ["shouldSpeak", "text", "emotion", "animation", "memoryCandidates"],
  additionalProperties: false,
};

export function validateReaction(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Provider reaction must be an object.");
  }
  if (typeof value.shouldSpeak !== "boolean") {
    throw new TypeError("Reaction shouldSpeak must be a boolean.");
  }
  if (typeof value.text !== "string") {
    throw new TypeError("Reaction text must be a string.");
  }
  if (typeof value.emotion !== "string" || !value.emotion.trim()) {
    throw new TypeError("Reaction emotion must be a non-empty string.");
  }
  if (value.animation !== null && typeof value.animation !== "string") {
    throw new TypeError("Reaction animation must be a string or null.");
  }
  if (!Array.isArray(value.memoryCandidates) || value.memoryCandidates.some((item) => typeof item !== "string")) {
    throw new TypeError("Reaction memoryCandidates must be an array of strings.");
  }
  if (!value.shouldSpeak && value.text.trim()) {
    throw new TypeError("A silent reaction must have empty text.");
  }

  return {
    shouldSpeak: value.shouldSpeak,
    text: value.text.trim(),
    emotion: value.emotion.trim(),
    animation: value.animation?.trim() || null,
    memoryCandidates: value.memoryCandidates.map((item) => item.trim()).filter(Boolean),
  };
}

export function parseReactionJson(content) {
  if (typeof content !== "string") throw new TypeError("Provider content must be a string.");
  const cleaned = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try {
    return validateReaction(JSON.parse(cleaned));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Provider returned invalid JSON: ${error.message}`);
    }
    throw error;
  }
}
