import { randomUUID } from "node:crypto";

export function createEvent(type, source, payload, importance = 0.5) {
  if (importance < 0 || importance > 1) {
    throw new RangeError("importance must be between 0 and 1");
  }

  return {
    id: randomUUID(),
    type,
    source,
    timestamp: new Date().toISOString(),
    importance,
    payload,
  };
}
