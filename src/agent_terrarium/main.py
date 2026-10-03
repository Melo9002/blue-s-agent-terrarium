from __future__ import annotations

import argparse

from agent_terrarium.inhabitants import INHABITANTS
from agent_terrarium.models import Event, InhabitantProfile
from agent_terrarium.providers import MockProvider
from agent_terrarium.runtime import AgentRuntime


def select_inhabitants(ids: list[str] | None) -> list[InhabitantProfile]:
    selected_ids = ids or ["basilisk"]
    if "all" in selected_ids:
        return list(INHABITANTS.values())
    return [INHABITANTS[inhabitant_id] for inhabitant_id in dict.fromkeys(selected_ids)]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the Agent Terrarium terminal prototype.")
    parser.add_argument(
        "-i",
        "--inhabitant",
        action="append",
        choices=[*INHABITANTS, "all"],
        help="Active inhabitant. Repeat for several, or use 'all'. Defaults to Basilisk.",
    )
    return parser.parse_args()


def run() -> None:
    args = parse_args()
    active_inhabitants = select_inhabitants(args.inhabitant)
    runtime = AgentRuntime(MockProvider())
    print("Blue's Agent Terrarium - Python core")
    print(f"Active: {', '.join(inhabitant.name for inhabitant in active_inhabitants)}")
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
        for inhabitant in active_inhabitants:
            result = runtime.handle(inhabitant, event)
            if result.reaction:
                print(f"{result.inhabitant}: {result.reaction.text}")
            else:
                print(f"{result.inhabitant}: [{result.status}] {result.reason}")


if __name__ == "__main__":
    run()
