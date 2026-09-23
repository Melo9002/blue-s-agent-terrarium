from __future__ import annotations

from time import perf_counter

from agent_terrarium.models import Event, InhabitantProfile, RuntimeResult
from agent_terrarium.providers.base import ModelProvider


class AgentRuntime:
    def __init__(self, provider: ModelProvider) -> None:
        self.provider = provider

    def handle(self, inhabitant: InhabitantProfile, event: Event) -> RuntimeResult:
        if event.importance < inhabitant.reaction_threshold:
            return RuntimeResult(
                inhabitant=inhabitant.name,
                status="ignored",
                event_id=event.id,
                reason=(
                    f"importance {event.importance} is below threshold "
                    f"{inhabitant.reaction_threshold}"
                ),
            )

        started_at = perf_counter()
        reaction = self.provider.generate(inhabitant, event)
        elapsed_ms = round((perf_counter() - started_at) * 1000)
        return RuntimeResult(
            inhabitant=inhabitant.name,
            status="responded" if reaction.should_speak else "silent",
            event_id=event.id,
            provider=self.provider.name,
            latency_ms=elapsed_ms,
            reaction=reaction,
        )
