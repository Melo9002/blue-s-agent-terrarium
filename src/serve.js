import { loadLocalEnvironment, readConfig } from "./config.js";
import { createProvider } from "./providers/index.js";
import { createTerrariumServer } from "./web/server.js";

loadLocalEnvironment();
const config = readConfig();
const provider = createProvider(config);
const host = "127.0.0.1";
const port = Number(process.env.TERRARIUM_PORT ?? 4317);

const server = createTerrariumServer({ provider });
server.listen(port, host, () => {
  console.log(`Blue's Agent Terrarium is growing at http://${host}:${port}`);
  console.log(`Provider: ${provider.name}`);
  console.log("Press Ctrl+C to stop.");
});

server.on("error", (error) => {
  console.error(`Terrarium server failed: ${error.message}`);
  process.exitCode = 1;
});
