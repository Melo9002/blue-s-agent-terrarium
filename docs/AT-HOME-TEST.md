# At-home provider check

The project can be tested with a hosted Groq model or a local Ollama model. Keep
real keys only in `.env`.

## Groq

1. Copy `.env.example` to `.env`.
2. Set:

```env
AGENT_PROVIDER=groq
GROQ_API_KEY=your_key
GROQ_MODEL=openai/gpt-oss-20b
```

3. Run:

```powershell
node src/check-provider.js
```

A successful check prints one short PixiHex reaction and reports `provider:
'groq'`.

## Ollama

1. Install Ollama and run:

```powershell
ollama run qwen3:1.7b
```

2. Set `.env`:

```env
AGENT_PROVIDER=ollama
OLLAMA_MODEL=qwen3:1.7b
OLLAMA_BASE_URL=http://localhost:11434
```

3. Run:

```powershell
node src/check-provider.js
```

A successful check prints one short PixiHex reaction and reports `provider:
'ollama'`.

## Interactive check

After the provider check succeeds:

```powershell
node src/index.js
```

Type `Hi`, inspect both reactions, and type `quit` to exit.

## Return to offline mode

```env
AGENT_PROVIDER=mock
```

No key is needed in mock mode.
