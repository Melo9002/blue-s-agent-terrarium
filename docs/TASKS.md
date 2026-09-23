# Blue's Agent Terrarium — Task Board

This is the practical, day-to-day task list. `ROADMAP.md` holds the long-term
direction; this file answers **what should we work on next?**

## Current milestone — Basilisk awakens

**Goal:** Open a native Terrarium window, select Basilisk-chan, type `Hi`, and
receive a validated response from the mock provider.

### 1. Stabilize the Python foundation

- [x] Target Python 3.13 while allowing Python 3.14.
- [x] Configure the project and dependencies in `pyproject.toml`.
- [x] Generate `uv.lock` for reproducible installations.
- [x] Pass the existing Python tests.
- [x] Pass Ruff linting and formatting.
- [x] Update the README from transitional Node instructions to Python/uv.
- [x] Update the project brief and roadmap for the native PySide6 app.
- [x] Preserve the obsolete Node prototype in Git history, then remove it.
- [x] Gather detailed project documentation under `docs/`.

**Done when:** A fresh clone can run `uv sync`, `uv run pytest`, and
`uv run ruff check .` successfully.

### 2. Complete the dependency-light core

- [ ] Add tests for both PixiHex and Basilisk profiles.
- [ ] Add tests for ignored events and spoken reactions.
- [ ] Add clear errors for malformed events and provider responses.
- [ ] Move inhabitant definitions from Python source into validated data files.
- [ ] Keep conversation history isolated per inhabitant in memory.

**Done when:** The core can be tested without opening a window or contacting a
real model.

### 3. Build the first native interface

- [ ] Create the PySide6 application entry point.
- [ ] Add an inhabitant selector containing Basilisk and PixiHex.
- [ ] Add a conversation display.
- [ ] Add a message box and Send button.
- [ ] Run model work outside the UI thread so the window never freezes.
- [ ] Connect the UI to the existing runtime and mock provider.
- [ ] Show useful errors in the interface.
- [ ] Add a small application smoke test where practical.

**Done when:** The app opens, Basilisk can be selected, and typing `Hi` displays
her mock response without using the terminal.

### 4. Give Basilisk a structured personality

- [ ] Write Basilisk's initial identity and behavior profile.
- [ ] Define her concise conversation style.
- [ ] Return text, emotion, animation, and `should_speak` consistently.
- [ ] Display emotion and animation cues in the interface for inspection.
- [ ] Add deterministic personality examples to tests.

**Done when:** Basilisk's responses are structurally reliable and recognizably
hers, even before a real model is connected.

### 5. Connect the first real model

- [ ] Implement the Python Ollama provider adapter.
- [ ] Add provider selection to configuration.
- [ ] Add timeout and connection-error handling.
- [ ] Validate and safely reject malformed model output.
- [ ] Test with a small local model.
- [ ] Keep the mock provider as the offline default for tests.

**Done when:** Switching configuration from Mock to Ollama makes Basilisk answer
through a local model without changing her profile or the UI.

## Next milestone — Basilisk remembers

- [ ] Design the minimal SQLite schema for sessions, messages, and reactions.
- [ ] Create the database in the correct user-data directory.
- [ ] Save separate conversation histories for each inhabitant.
- [ ] Restore recent history after restarting the app.
- [ ] Introduce reviewable memory candidates.
- [ ] Allow memories to be accepted, edited, rejected, and deleted.
- [ ] Store memory source and confidence.

**Done when:** Basilisk remembers an approved fact after Terrarium restarts, and
PixiHex does not inherit it accidentally.

## Following milestone — PixiHex joins

- [ ] Write PixiHex's initial identity and behavior profile.
- [ ] Give PixiHex an independent conversation and memory scope.
- [ ] Add a read-only project inspection capability.
- [ ] Let PixiHex view directory trees, selected files, and Git status.
- [ ] Require approval before any future file modification or command.

**Done when:** PixiHex can inspect a project and explain what she sees without
modifying it.

## Later habitats

- [ ] Local text-to-speech and speech queue.
- [ ] Live2D expressions through VTube Studio.
- [ ] Simulated game-event panel and first game connector.
- [ ] Drawing and sandboxed coding capabilities.
- [ ] Scheduled bounded free-time activity.
- [ ] Inhabitant-to-inhabitant conversations.
- [ ] Singing and other expression modules.
- [ ] Remote or embedded embodiment bridges.

## Working rules

- Keep one active milestone at a time.
- Prefer the smallest visible end-to-end result.
- Add an abstraction after two real implementations demonstrate the seam.
- Keep Mock working so development never requires tokens or internet access.
- Treat identity, capabilities, providers, and bodies as separate.
- Require approval for consequential external actions.
- Every completed task should leave tests, documentation, or visible behavior.

