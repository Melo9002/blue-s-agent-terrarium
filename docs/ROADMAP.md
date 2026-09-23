# Roadmap

`TASKS.md` is the active work board. This document describes the larger product
sequence and the observable result that completes each milestone.

## Milestone 0 — Python foundation

- uv-managed Python 3.13/3.14 project
- Validated domain models and structured reactions
- PixiHex and Basilisk profiles
- Provider-neutral interface and offline mock provider
- Importance filtering, terminal smoke test, tests, linting, and formatting
- Native-Python documentation with the Node prototype removed

**Exit:** A fresh clone passes the checks and runs `uv run agent-terrarium`.

## Milestone 1 — Basilisk awakens

- Native PySide6 application shell and inhabitant selector
- Transcript, message box, and Send action
- Provider work outside the UI thread
- Mock provider connected end to end
- Visible emotion, animation intent, and errors
- Initial Basilisk identity and behavior profile

**Exit:** Select Basilisk, type `Hi`, and see her response in the native window.

## Milestone 2 — First real model

- Python Ollama adapter and validated provider settings
- Timeouts, cancellation, connection errors, and safe output validation
- Provider, model, and latency metadata
- Mock retained for tests and offline use

**Exit:** Configuration switches a conversation between Mock and Ollama without
changing the UI, runtime, or inhabitant profile.

## Milestone 3 — Basilisk remembers

- Automatic SQLite setup in a platform-appropriate data directory
- Separate sessions, messages, reactions, and histories per inhabitant
- Restored history and reviewable memory candidates
- Accept, edit, reject, and delete controls with provenance and confidence

**Exit:** Basilisk remembers an approved fact after restart without leaking it
into PixiHex's memory.

## Milestone 4 — PixiHex joins the workshop

- Independent PixiHex identity, conversation, and memory
- Read-only project, directory-tree, file, and Git-status inspection
- Visible tool activity and an approval boundary before modification

**Exit:** PixiHex can inspect and explain a project without changing it.

## Milestone 5 — Voice and avatar expression

- Expression-module boundary derived from text and speech
- Local text-to-speech, queue, interruption, and mute controls
- Emotion mapping and VTube Studio connection
- Graceful offline behavior and per-inhabitant settings

**Exit:** A reaction appears as text, plays as speech, and triggers Live2D.

## Milestone 6 — Live companion events

- Event simulator, cooldowns, deduplication, priority, and bounded queues
- First read-only game connector with lifecycle and reconnect behavior
- Full-session tuning for silence versus commentary

**Exit:** One game causes timely reactions without flooding the player.

## Milestone 7 — Capabilities and permission gates

- Sandboxed coding and drawing capabilities
- Allow, ask, and deny policies
- Reviewable artifacts and approvals
- Per-run time, step, and spending limits

**Exit:** An inhabitant produces useful work while consequential actions remain
reviewable and bounded.

## Milestone 8 — Growth

- Scheduled wake cycles, goals, interests, journals, and sourced reflections
- Bounded self-directed activities
- User-visible correction and forgetting controls

**Exit:** An inhabitant safely chooses, completes, records, and stops a small
activity within its limits.

## Later habitats

- Inhabitant collaboration and shared/private memories
- Multiple avatars, singing, and additional expression modules
- Satellite runtimes and embedded embodiment bridges
- Multiple games and packaged Windows, Linux, and macOS releases
- Encrypted backup, optional synchronization, and importable habitats

## Explicitly outside early milestones

- unrestricted autonomy;
- direct low-level motor control;
- unreviewed publishing or messaging;
- automatic personality rewriting;
- a universal third-party plugin marketplace; and
- cloud sync before local persistence is trustworthy.

