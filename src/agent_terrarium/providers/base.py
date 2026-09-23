from __future__ import annotations

from typing import Protocol

from agent_terrarium.models import Event, InhabitantProfile, Reaction


class ModelProvider(Protocol):
    @property
    def name(self) -> str: ...

    def generate(self, inhabitant: InhabitantProfile, event: Event) -> Reaction: ...
