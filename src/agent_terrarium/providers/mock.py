from agent_terrarium.models import Event, InhabitantProfile, Reaction


class MockProvider:
    @property
    def name(self) -> str:
        return "mock"

    def generate(self, inhabitant: InhabitantProfile, event: Event) -> Reaction:
        observed = event.payload.get("text", str(event.payload))
        urgent = event.importance >= 0.8
        return Reaction(
            should_speak=True,
            text=f'{inhabitant.name} observed \"{observed}\" and wants to respond.',
            emotion="surprised" if urgent else "curious",
            animation="react" if urgent else None,
            memory_candidates=[],
        )

