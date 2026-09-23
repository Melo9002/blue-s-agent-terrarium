# Blue's Agent Terrarium project brief

## Product statement

Blue's Agent Terrarium is a local-first, cross-platform desktop habitat for
persistent AI characters. An inhabitant retains its identity while moving
between conversation, live-companion, task, and bounded free-time modes.

PixiHex and Basilisk-chan are inhabitants, not separate applications or fixed
agent classes. Either may eventually talk, code, draw, research, react to games,
use an avatar, sing, or connect to another device when the corresponding module
and permission are available.

## Product shape

BAT is a native Python application using Python 3.13/3.14, uv, PySide6,
Pydantic, HTTPX, SQLite, pytest, and Ruff. It begins as one modular-monolith
desktop process. The primary host stays local because it will eventually reach
files, Git, microphones, games, avatars, GPUs, and streaming software.

## Core decisions

- Build one shared habitat, not separate applications per character.
- Separate inhabitants from capabilities, senses, expressions, and bodies.
- Normalize external input into typed events.
- Keep model, voice, image, avatar, and game integrations behind adapters.
- Use deterministic code for permissions, timing, queues, budgets, and safety.
- Use models for language, interpretation, planning, and creative work.
- Keep each inhabitant's history, memories, goals, and permissions isolated.
- Keep a mock provider for offline development and automated tests.
- Extract general module contracts only after real modules reveal the seams.

## Module families

1. **Input connectors** emit events from games, chat, microphones, schedules,
   files, or hardware.
2. **Capabilities** perform work such as coding, drawing, or research.
3. **Expression modules** render intent as text, speech, singing, or motion.
4. **Embodiment bridges** connect inhabitants to other hosts or devices while
   leaving hardware safety to a local controller.

## Permission model

- **Allow:** read approved files, research, create drafts, and use a sandbox.
- **Ask:** modify real projects, run consequential commands, commit code, spend
  beyond a budget, or communicate externally.
- **Deny by default:** expose credentials, delete important data, spend money,
  publish, or directly control unsafe hardware.

## First user journey

1. Start the native Terrarium application.
2. Select Basilisk-chan and type `Hi`.
3. Receive text, emotion, animation intent, and a speaking decision.
4. Switch from Mock to Ollama without changing Basilisk or the UI.
5. Restart and recover separate history and approved memory.

## Current state

The Python foundation provides validated models, PixiHex and Basilisk profiles,
an importance-filtering runtime, a provider protocol, an offline mock provider,
a terminal loop, and passing tests. The Node/browser prototype remains
recoverable from commit `eb32a35` (`the great python reset`).

## Immediate objective

Create the first PySide6 window and connect it to the existing runtime and mock
provider. The milestone ends when Basilisk can answer `Hi` without the terminal.

