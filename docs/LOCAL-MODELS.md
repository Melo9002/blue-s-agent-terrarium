# Local models

BAT uses Ollama as the local model runtime. Model weights are downloaded and
managed by Ollama; they are not stored in this Git repository.

## Why model files stay outside Git

- `qwen3.5:4b` is several gigabytes.
- Git is inefficient for large changing binary model files.
- Model storage is machine-specific and may live on another drive.
- Ollama already handles downloads, versions, manifests, and GPU loading.
- A clean BAT clone should remain small and should still run with Mock when no
  local model is installed.

## Windows setup

1. Install Ollama from <https://ollama.com/download/windows>.
2. Open a new PowerShell window.
3. Download BAT's default local model:

   ```powershell
   ollama pull qwen3.5:4b
   ```

4. Verify it interactively:

   ```powershell
   ollama run qwen3.5:4b
   ```

5. Type a short prompt, then use `/bye` to leave the Ollama conversation.

Ollama runs in the background on Windows and exposes its local API at
`http://localhost:11434` by default.

## Verify the service and model

```powershell
ollama list
Invoke-RestMethod http://localhost:11434/api/tags
```

`qwen3.5:4b` should appear in the installed-model list.

## BAT configuration

Copy `.env.example` to `.env` and keep `.env` out of Git:

```env
AGENT_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen3.5:4b
OLLAMA_TIMEOUT_SECONDS=60
OLLAMA_KEEP_ALIVE=5m
```

These values document the intended interface. They will become active when the
Python Ollama adapter is implemented. Until then BAT continues to use Mock.

For a lighter fallback, change only:

```env
OLLAMA_MODEL=qwen3.5:2b
```

## Storage

On Windows, Ollama normally keeps models under the user's `.ollama` directory.
To store models on another drive, set the user environment variable
`OLLAMA_MODELS` to the desired directory and restart Ollama.

Do not copy Ollama's model directory into BAT. On another computer, clone BAT
and run `ollama pull qwen3.5:4b` again.

## Planned BAT integration

The Python adapter will:

1. Query `GET /api/tags` to verify that the configured model exists.
2. Send conversations to `POST /api/chat`.
3. Request BAT's reaction JSON schema through Ollama's `format` field.
4. Disable streaming for the first implementation to simplify validation.
5. Set a conservative context size and configurable `keep_alive` duration.
6. Validate every response with BAT's Pydantic `Reaction` model.
7. Report unavailable service, missing model, timeout, and invalid output errors.

