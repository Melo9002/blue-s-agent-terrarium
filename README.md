# Blue's Agent Terrarium

**A local-first platform for creating, cultivating, and running persistent AI characters.**

Blue's Agent Terrarium is an experimental home for digital characters that can
converse, react to games, use live 2D or 3D avatars, create art, write code, and
pursue bounded activities over time.

The project treats characters as persistent inhabitants rather than isolated
chat sessions. Each inhabitant can have its own identity, memories, interests,
voice, avatar, permissions, and preferred AI provider while sharing a common
runtime and tool ecosystem.

## Vision

An inhabitant should be able to move between several modes without becoming a
separate application:

- **Conversation** — speak directly with a person.
- **Live companion** — observe game, chat, microphone, or stream events and
  decide when to react.
- **Task** — work toward a defined outcome such as writing code, researching a
  subject, or creating an image.
- **Free time** — wake periodically, review goals and memories, and choose a
  bounded activity.

PixiHex and Basilisk are the first planned inhabitants. Both are intended to use
the same capabilities while developing different histories, preferences, and
styles of interaction.

## Design principles

- **Local first.** Games, avatars, files, microphones, and development tools are
  connected through a local host.
- **Provider independent.** Model, voice, vision, and image services sit behind
  adapters so they can be changed without redefining a character.
- **Event driven.** External activity is normalized into typed events before an
  inhabitant observes it.
- **Persistent but inspectable.** Memories and learned preferences retain their
  source and can be reviewed, corrected, or removed.
- **Agency with boundaries.** Tools use explicit allow, ask, and deny policies,
  along with time, step, and spending limits.
- **Quiet by design.** Live characters evaluate relevance, priority, cooldowns,
  and interruptions instead of reacting to every event.

## Architecture

```text
Games / chat / microphone / schedules / user requests
                         |
                     Event bus
                         |
        +----------------+----------------+
        |                                 |
  Reactive runtime                 Persistent runtime
        |                                 |
        +---------------+-----------------+
                        |
                 Character profile
          identity / memory / permissions
                        |
                  Model gateway
          OpenAI / Gemini / local / mock
                        |
                 Capability tools
       voice / avatar / code / art / research
```

## Current status

The repository currently contains the first executable core prototype:

- PixiHex and Basilisk character profiles;
- a shared event schema;
- configurable reaction thresholds;
- a provider boundary with a zero-cost mock implementation;
- a terminal demonstration; and
- tests for important-event delivery and noise suppression.

No real model, game, avatar, or voice service is connected yet.

## Run the prototype

Requires Node.js 20 or newer. The current prototype has no external package
dependencies.

```powershell
node src/index.js --demo
node --test
```

To enter events interactively:

```powershell
node src/index.js
```

## Roadmap

1. Provider-neutral structured reactions
2. OpenAI and Gemini text adapters
3. SQLite-backed runs and memory
4. Local management interface
5. Voice and VTube Studio integration
6. First real game connector
7. Sandboxed coding and image-generation tools
8. Scheduled bounded activity
9. Optional desktop packaging and encrypted cloud synchronization

## Project stage

Blue's Agent Terrarium is an early personal experiment. Its architecture and
terminology will evolve as the first inhabitants begin using real tools and
interacting with live environments.
