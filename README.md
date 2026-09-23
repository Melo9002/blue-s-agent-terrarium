# Blue's Agent Terrarium

**A local-first habitat for persistent digital characters.**

Blue's Agent Terrarium (BAT) is an experimental cross-platform desktop
application where AI inhabitants can converse, remember, react to events, and
eventually use modular capabilities such as coding, drawing, voice, avatars,
games, and bounded independent activity.

PixiHex and Basilisk-chan are the first planned inhabitants. They share the same
runtime and capability system while keeping separate identities, histories,
preferences, and permissions.

## Current milestone: Basilisk awakens

```text
Open the native Terrarium app
        -> select Basilisk-chan
        -> type "Hi"
        -> receive a validated mock response
```

The repository currently contains the dependency-light Python core: validated
domain models, PixiHex and Basilisk profiles, importance-based event filtering,
a provider-neutral interface, an offline mock provider, a terminal loop, and
automated tests. The native PySide6 interface is the next implementation stage.

## Stack

- Python 3.13 or 3.14
- uv for dependencies, virtual environments, and locking
- PySide6 for the native desktop interface
- Pydantic for validated models and settings
- HTTPX for provider connections
- SQLite for future local persistence
- pytest and Ruff for development checks

BAT starts as a modular monolith: one repository, one Python environment, and
one desktop process with clear internal boundaries.

## Setup

Install [uv](https://docs.astral.sh/uv/getting-started/installation/), then run:

```powershell
uv sync --python 3.13
uv run pytest
uv run ruff check .
```

`uv sync` creates `.venv` and installs the dependency versions in `uv.lock`.

## Run the current prototype

```powershell
uv run agent-terrarium
```

Type a message and press Enter. The mock provider responds without internet or
API credits. Type `quit` to exit.

## Development checks

```powershell
uv run pytest
uv run ruff check .
uv run ruff format --check .
```

## Architecture

```text
Input connectors -> typed events -> inhabitant runtime -> model provider
                                            |
                                      permissions/memory
                                            |
                          capabilities and expression modules
```

- **Inhabitants** hold identity, preferences, memory scope, and permissions.
- **Providers** generate language or decisions and remain replaceable.
- **Capabilities** perform work such as coding, drawing, or research.
- **Input connectors** translate games, chat, sensors, or timers into events.
- **Expression modules** render intent as text, speech, animation, or song.
- **Embodiment bridges** may later connect inhabitants to remote devices.

## Project navigation

- [`docs/TASKS.md`](docs/TASKS.md) — active, checkable work board
- [`docs/PROJECT-BRIEF.md`](docs/PROJECT-BRIEF.md) — product decisions
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — milestone sequence
- [`docs/SETUP.md`](docs/SETUP.md) — additional environment notes
- [`docs/AT-HOME-TEST.md`](docs/AT-HOME-TEST.md) — verification checklist

## Safety principles

- Prefer reversible, inspectable actions.
- Separate identity from capabilities and bodies.
- Keep Mock available for offline, token-free development.
- Put consequential actions behind explicit allow, ask, or deny policies.
- Never commit API keys, private memories, or local databases.
- Add abstractions after real implementations reveal the shared contract.
