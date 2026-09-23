# At-home verification

From the repository root after installing uv:

```powershell
uv sync --python 3.13
uv run python --version
uv run pytest
uv run ruff check .
uv run ruff format --check .
```

Python should report 3.13.x, all tests should pass, and Ruff should report no
errors. Python 3.14 is also supported when selected explicitly.

Run the current offline prototype:

```powershell
uv run agent-terrarium
```

Type `Hi`, verify that PixiHex and Basilisk produce mock responses, then type
`quit`. Mock requires no internet connection or API credits.

## Future local-model check

Ollama is not connected to the active Python implementation yet. After its
Python adapter exists, this page will document the supported model and test.

