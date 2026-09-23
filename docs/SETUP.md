# Development setup

## Minimal setup

Required:

- Git
- Node.js LTS, including npm
- A code editor such as Visual Studio Code

Verify in PowerShell:

```powershell
git --version
node --version
npm --version
```

Run the dependency-free prototype:

```powershell
cd agent-studio
node src/index.js --demo
```

## Later desktop setup

Only install these when packaging the browser interface as a Tauri desktop app:

- Rust through rustup
- Microsoft C++ Build Tools with Desktop development with C++
- Microsoft Edge WebView2 when it is not already present

Python is optional. Add it only when a specific local AI or media library needs
it. It is not required for the initial TypeScript platform.

## Secrets

Put API keys in a local `.env` file. The repository ignores `.env` files. Never
place keys directly in source code or commit them to Git.

## Moving between computers

Use a private Git repository when permitted by workplace policy. Commit source,
documentation, and safe configuration examples. Do not commit `.env`, generated
media, model files, personal memories, or secrets.
