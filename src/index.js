import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { agents } from "./agents.js";
import { createEvent } from "./events.js";
import { MockProvider } from "./providers/mock-provider.js";
import { AgentRuntime } from "./runtime.js";

const runtime = new AgentRuntime(new MockProvider());

async function dispatch(event) {
  console.log("\nEvent:", event);

  for (const agent of Object.values(agents)) {
    console.log("Result:", await runtime.handle(agent, event));
  }
}

async function demo() {
  await dispatch(
    createEvent(
      "game.discovery",
      "demo-game",
      { text: "The player discovered a glowing cave." },
      0.8,
    ),
  );

  await dispatch(
    createEvent(
      "game.footstep",
      "demo-game",
      { text: "The player took one ordinary step." },
      0.1,
    ),
  );
}

async function interactive() {
  const terminal = createInterface({ input, output });
  console.log("Agent Studio prototype. Type a world event, or 'quit'.");

  while (true) {
    const text = (await terminal.question("\nEvent> ")).trim();
    if (!text || text.toLowerCase() === "quit") break;
    await dispatch(createEvent("user.message", "terminal", { text }, 0.7));
  }

  terminal.close();
}

if (process.argv.includes("--demo")) {
  await demo();
} else {
  await interactive();
}
