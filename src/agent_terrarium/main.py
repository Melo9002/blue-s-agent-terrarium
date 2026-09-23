from __future__ import annotations

from agent_terrarium.inhabitants import INHABITANTS
from agent_terrarium.models import Event
from agent_terrarium.providers import MockProvider
from agent_terrarium.runtime import AgentRuntime


def run() -> None:
    runtime = AgentRuntime(MockProvider())
    print("Blue's Agent Terrarium - Python core")
    print("Provider: mock. Type a message, or 'quit'.")

    while True:
        try:
            text = input("\nEvent> ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            break
        if not text or text.lower() == "quit":
            break

        event = Event(
            type="user.message", source="terminal", importance=0.7, payload={"text": text}
        )
        for inhabitant in INHABITANTS.values():
            result = runtime.handle(inhabitant, event)
            if result.reaction:
                print(f"{result.inhabitant}: {result.reaction.text}")
            else:
                print(f"{result.inhabitant}: [{result.status}] {result.reason}")


if __name__ == "__main__":
    run()
