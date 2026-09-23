# Agent Studio project brief

## Vision

Build a desktop-first platform for persistent AI characters. PixiHex and
Basilisk can both talk, react to games, code, draw, research, use avatars, and
work independently within explicit limits.

## Core decisions

- One shared platform, not two disconnected applications.
- Characters are profiles with identity, memory, tools, and permissions.
- Any character can use conversation, reactive, task, or free-time mode.
- All external input is normalized into typed events.
- Model, voice, image, avatar, and game integrations use replaceable adapters.
- Local deterministic logic controls timing, permissions, budgets, and safety.
- Models provide language, planning, interpretation, and creative output.
- Begin with a mock provider before spending API credits.

## Initial milestones

1. Terminal event demo with two character profiles and a mock provider.
2. Real text model adapter with structured responses.
3. SQLite run history and memory.
4. Local browser dashboard.
5. Voice and VTube Studio integration.
6. One real game connector.
7. Sandboxed coding and image generation tools.
8. Scheduled free-time runtime with approval gates and budgets.

## Permission levels

- Allow: read approved files, research, create drafts, use a sandbox.
- Ask: modify real projects, commit code, spend beyond limits, send messages.
- Deny by default: publish, delete important data, expose credentials, spend money.

## Current state

Lesson 1 is implemented in `src/`. It has no dependencies and demonstrates:

- a common event schema;
- shared capabilities through character profiles;
- reaction thresholds;
- a provider boundary; and
- important events versus ignored noise.

## Next implementation task

Add a provider-neutral structured result schema, then implement one real model
adapter selected through environment variables. Keep the mock provider for free
development and automated checks.
