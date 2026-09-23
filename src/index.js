import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { agents } from "./agents.js";
import { loadLocalEnvironment, readConfig } from "./config.js";
import { createEvent } from "./events.js";
import { createProvider } from "./providers/index.js";
import { AgentRuntime } from "./runtime.js";

loadLocalEnvironment();
const config = readConfig();
const provider = createProvider(config);
const runtime = new AgentRuntime(provider);

async function dispatch(event) {
  console.log("\nEvent:", event);
  for (const agent of Object.values(agents)) {
    try {
      console.log("Result:", await runtime.handle(agent, event));
    } catch (error) {
      console.error(`${agent.name} failed: ${error.message}`);
    }
  }
}

async function demo() {
  await dispatch(createEvent(
    "game.discovery",
    "demo-game",
    { text: "The player discovered a glowing cave." },
    0.8,
  ));
  await dispatch(createEvent(
    "game.footstep",
    "demo-game",
    { text: "The player took one ordinary step." },
    0.1,
  ));
}

async function interactive() {
  const terminal = createInterface({ input, output });
  console.log(`Blue's Agent Terrarium — provider: ${provider.name}`);
  console.log("Type a world event, or 'quit'.");

  while (true) {
    const text = (await terminal.question("\nEvent> ")).trim();
    if (!text || text.toLowerCase() === "quit") break;
    await dispatch(createEvent("user.message", "terminal", { text }, 0.7));
  }
  terminal.close();
}

try {
  if (process.argv.includes("--demo")) await demo();
  else await interactive();
} catch (error) {
  console.error(`Startup failed: ${error.message}`);
  process.exitCode = 1;
}
