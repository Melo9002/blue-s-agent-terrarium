# Roadmap

## First final form: v0.1 — First Habitat

The first complete version is a local application in which PixiHex and Basilisk
can hold a real text conversation, remember a few approved facts, react to a
stream of game-like events, speak through a local voice, and drive expressions
on one Live2D avatar. The model can be switched between a free online Gemini
adapter and a local Ollama adapter without changing either character.

This version is complete when someone can clone the repository, configure one
provider, open the local interface, select an inhabitant, say hello, send or
receive a game event, and see the character decide whether to respond, speak,
and emote. The session and its memories must still be present after restarting
the application.

### v0.1 user journey

1. Start the local host.
2. Open the Terrarium interface in a browser.
3. Select PixiHex, Basilisk, or both.
4. Select Mock, Gemini, or Ollama as the model provider.
5. Send a message and receive a character-specific response.
6. Send a simulated event or start the first supported game connector.
7. Watch the runtime suppress noise and react to an important event.
8. Hear the response through local text-to-speech.
9. See the selected VTube Studio expression trigger.
10. Restart the application and continue with saved history and approved memory.

## Milestone 0 — Executable core

- [x] Create PixiHex and Basilisk profiles.
- [x] Define the common event envelope.
- [x] Add importance thresholds.
- [x] Add a mock provider.
- [x] Add terminal demo and interactive input.
- [x] Test important-event delivery and noise suppression.
- [x] Define and validate a structured reaction result:
  `shouldSpeak`, `text`, `emotion`, `animation`, and `memoryCandidates`.
- [ ] Separate character profiles from source code into validated data files.
- [ ] Add clear runtime errors for malformed profiles, events, and provider output.

**Exit:** Mock events produce validated, predictable reactions for either
inhabitant.

## Milestone 1 — Real model gateway

- [x] Define a provider-neutral model interface.
- [x] Select providers through environment configuration.
- [x] Add Groq for free hosted development.
- [ ] Add Gemini Flash Lite as another free online option.
- [x] Add Ollama for free local development.
- [x] Keep the mock provider available offline and in tests.
- [x] Add timeouts, cancellation, and useful connection errors.
- [x] Keep API keys exclusively in ignored environment files.
- [ ] Record provider, model, latency, and token information when available.

**Exit:** The same event can be answered by Mock, Gemini, or Ollama without
changing the runtime or character profile.

## Milestone 2 — Conversation and persistence

- [ ] Add SQLite with automatic local setup.
- [ ] Store inhabitants, sessions, events, messages, reactions, and run metadata.
- [ ] Restore recent conversation after a restart.
- [ ] Add explicit memory candidates rather than saving every message as memory.
- [ ] Let the user accept, edit, or reject proposed long-term memories.
- [ ] Store memory provenance and confidence.
- [ ] Support deletion of a session or memory.

**Exit:** Each inhabitant maintains separate history and approved memories across
restarts.

## Milestone 3 — Terrarium interface

- [ ] Add a local HTTP server and browser interface.
- [ ] Show inhabitant cards with current status and selected provider.
- [ ] Add text chat with one inhabitant or both.
- [ ] Show incoming events and whether each inhabitant ignored or answered them.
- [ ] Add pause, mute, and stop controls.
- [ ] Add profile editing for identity, speaking style, and reaction threshold.
- [ ] Add provider health and configuration status without revealing secrets.
- [ ] Show basic latency and usage information.

**Exit:** Normal use no longer requires the terminal, while logs remain available
for diagnosis.

## Milestone 4 — Live character output

- [ ] Define voice and avatar adapter interfaces.
- [ ] Add a free local or operating-system text-to-speech adapter.
- [ ] Add a speech queue and prevent overlapping lines.
- [ ] Map structured emotions to expressions.
- [ ] Connect to the VTube Studio WebSocket API.
- [ ] Trigger configured Live2D expressions or hotkeys.
- [ ] Add connection tests and graceful behavior when VTube Studio is closed.
- [ ] Add per-inhabitant voice and avatar settings.

**Exit:** A response can appear as text, play as speech, and trigger a visible
Live2D reaction.

## Milestone 5 — Events and first game connector

- [ ] Add an event simulator to the interface.
- [ ] Add cooldowns, deduplication, priority, and a bounded event queue.
- [ ] Choose the first game based on available logs, modding hooks, telemetry, or
  APIs.
- [ ] Implement one read-only connector for that game.
- [ ] Translate game-specific observations into the common event envelope.
- [ ] Provide start, stop, connection status, and reconnect behavior.
- [ ] Test a complete play session and tune silence versus commentary.

**Exit:** At least one real game can cause timely spoken and animated reactions
without flooding the player with commentary.

## Milestone 6 — Reliability and v0.1 release

- [ ] Prevent provider or adapter failures from crashing the host.
- [ ] Add bounded retries and visible error states.
- [ ] Redact secrets from errors and logs.
- [ ] Add export and import for safe character profiles.
- [ ] Add a first-run setup flow.
- [ ] Verify fresh installation instructions on Windows.
- [ ] Add meaningful tests for provider contracts, persistence, queues, and
  configuration validation.
- [ ] Document known limitations and data locations.
- [ ] Tag `v0.1.0` after the full user journey passes.

**Exit:** The First Habitat user journey works from a fresh clone and survives
ordinary provider, avatar, and game-connector interruptions.

## After v0.1

### v0.2 — Workshop

- Sandboxed file and coding tools
- Git inspection and test execution
- Image-generation adapters
- Allow, ask, and deny permission policies
- Per-run step, time, and spending budgets
- Reviewable artifacts and approvals

### v0.3 — Growth

- Scheduled wake cycles
- Goals, interests, and personal journals
- Reflection over sourced memories
- Bounded self-directed activities
- User-visible correction and forgetting controls

### v0.4 — Shared Terrarium

- Inhabitant-to-inhabitant conversations
- Collaboration and handoffs
- Shared and private memories
- Speaking and activity coordination
- Multiple simultaneous avatars

### v1.0 — Portable Terrarium

- Packaged desktop application
- 2D and 3D avatar adapters
- Multiple game connectors
- Mature coding, art, research, and streaming tools
- Encrypted backup and optional synchronization
- Importable character and habitat packages

## Explicitly outside v0.1

The following are valuable, but are excluded from the first complete version to
keep it achievable:

- unrestricted autonomous operation;
- computer control;
- publishing or messaging external users;
- local image generation;
- full coding-agent behavior;
- 3D avatar support;
- cloud synchronization;
- multiple games; and
- automatic personality rewriting.

