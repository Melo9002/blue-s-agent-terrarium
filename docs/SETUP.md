# Development setup

## Required

- Git
- uv
- A code editor such as Visual Studio Code or PyCharm

Python 3.13 is the project's default. Python 3.14 is also supported. uv can use
the existing interpreter or install the requested version without replacing the
system Python.

Verify in PowerShell:

```powershell
git --version
uv --version
python --version
```

If a newly installed `uv` is not visible, restart the terminal or invoke it once
from `%USERPROFILE%\.local\bin\uv.exe`.

## Create the project environment

From the repository root:

```powershell
uv sync --python 3.13
uv run pytest
uv run ruff check .
```

Run the dependency-light terminal prototype with:

```powershell
uv run agent-terrarium
```

PySide6 is installed as a project dependency; a separate Qt installation is not
required. Node.js, npm, Rust, Tauri, Docker, and a database server are not needed.

## Secrets and local data

Put future provider keys only in a local `.env` file. The repository ignores
`.env`, `.venv`, caches, databases under `data/`, and logs. Never commit API
keys, private memories, downloaded models, or personal generated data.

## Moving between computers

Use Git for source, documentation, and safe configuration examples. Run
`uv sync` separately on each computer instead of copying `.venv`, because a
virtual environment contains machine-specific paths.

The committed `uv.lock` keeps dependency resolution consistent across supported
machines. If an offline work computer is needed later, carry a uv package cache
rather than the virtual environment.

