# Blue's Agent Terrarium — Requirements

This document records agreed product requirements. The task board describes the
work needed to implement them; the roadmap describes the order.

## Model-provider requirements

### Provider independence

- Inhabitants must not depend directly on a particular model provider.
- Provider adapters must implement the same core request/result contract.
- Changing providers must not require changing an inhabitant's identity,
  memories, conversation UI, or runtime logic.
- The application must retain an offline Mock provider for tests and development.

### Initial provider roles

- **GPT/OpenAI:** preferred option for difficult reasoning, planning, and coding
  when configured and available.
- **Qwen through local Ollama:** preferred local and offline conversational
  fallback.
- **Mock:** deterministic, token-free provider for automated tests and UI work.

The first supported local model will be `qwen3.5:4b`. A smaller
`qwen3.5:2b` model may be configured as a low-resource fallback.

### Configuration

- The user must be able to choose a provider explicitly.
- Provider and model selection must be configuration, not hard-coded behavior.
- API keys must remain in ignored local configuration or an operating-system
  credential store and must never be written to logs or committed.
- Local Ollama configuration must support a configurable base URL and model name.
- The UI must show the active provider and model without exposing credentials.

### Fallback behavior

- Automatic fallback must be optional and visible to the user.
- A failed cloud request may fall back to configured local Qwen only when local
  Ollama is healthy and the requested operation is compatible.
- BAT must identify which provider produced each response.
- BAT must not silently repeat a consequential tool action through another
  provider after a partial failure.
- If no compatible provider is available, BAT must show a useful error rather
  than fabricate a response.

### Local Qwen acceptance criteria

The Ollama/Qwen adapter is complete when BAT can:

1. Detect whether Ollama is reachable at its configured URL.
2. Detect whether the configured Qwen model is installed.
3. Send a conversation request to `qwen3.5:4b`.
4. Validate a structured reaction containing speaking decision, text, emotion,
   animation intent, and memory candidates.
5. Apply a timeout and allow cancellation.
6. Report connection, missing-model, timeout, and invalid-output errors clearly.
7. Record provider name, model name, and latency for the run.
8. Fall back to Mock in tests without Ollama or network access.

### Resource expectations

- BAT must remain usable on the current development computer with an RTX 5060
  and 16 GB of system memory.
- Local-model context limits must be configurable and conservative by default.
- BAT should avoid keeping an unused local model loaded indefinitely.
- Running Qwen must not be a prerequisite for launching BAT or editing profiles.
- Larger local models are optional experiments, not baseline requirements.

## Inhabitant-management requirements

- Installed, enabled, disabled, active, and archived are separate states.
- One or more inhabitants may be active in a conversation or event stream.
- Basilisk is the default active inhabitant in the early prototype.
- Disabling or archiving an inhabitant must preserve its profile and history.
- Deleting inhabitant data must be a separate explicit operation.
- Future inhabitants must be addable without changing the core runtime.

## Current first-release requirement

The immediate product target remains:

> Open the native Terrarium, select Basilisk-chan, type `Hi`, and receive a
> validated response through Mock; then switch configuration to local
> `qwen3.5:4b` and repeat the same interaction without changing the UI or
> Basilisk's profile.

