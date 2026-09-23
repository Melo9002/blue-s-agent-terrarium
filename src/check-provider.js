import { agents } from "./agents.js";
import { loadLocalEnvironment, readConfig } from "./config.js";
import { createEvent } from "./events.js";
import { createProvider } from "./providers/index.js";
import { AgentRuntime } from "./runtime.js";

loadLocalEnvironment();
const config = readConfig();
const provider = createProvider(config);
const runtime = new AgentRuntime(provider);
const event = createEvent("user.message", "provider-check", { text: "Say hi in one short sentence." }, 1);

console.log(`Checking ${provider.name} with ${agents.pixihex.name}...`);
try {
  const result = await runtime.handle(agents.pixihex, event);
  console.log(result);
} catch (error) {
  console.error(`Provider check failed: ${error.message}`);
  process.exitCode = 1;
}
