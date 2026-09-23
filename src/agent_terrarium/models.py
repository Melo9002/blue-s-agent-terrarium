from __future__ import annotations

from datetime import UTC, datetime
from typing import Any, Literal
from uuid import UUID, uuid4

from pydantic import BaseModel, Field, model_validator


class Event(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    type: str = Field(min_length=1)
    source: str = Field(min_length=1)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(UTC))
    importance: float = Field(default=0.5, ge=0, le=1)
    payload: dict[str, Any] = Field(default_factory=dict)


class Reaction(BaseModel):
    should_speak: bool
    text: str
    emotion: str = Field(min_length=1)
    animation: str | None = None
    memory_candidates: list[str] = Field(default_factory=list)

    @model_validator(mode="after")
    def silent_reactions_have_no_text(self) -> Reaction:
        self.text = self.text.strip()
        self.emotion = self.emotion.strip()
        self.animation = self.animation.strip() if self.animation else None
        self.memory_candidates = [item.strip() for item in self.memory_candidates if item.strip()]
        if not self.should_speak and self.text:
            raise ValueError("a silent reaction must have empty text")
        return self


class InhabitantProfile(BaseModel):
    id: str = Field(pattern=r"^[a-z][a-z0-9-]*$")
    name: str = Field(min_length=1)
    identity: str = Field(min_length=1)
    modes: set[Literal["conversation", "reactive", "task", "free-time"]]
    interests: list[str] = Field(default_factory=list)
    reaction_threshold: float = Field(default=0.5, ge=0, le=1)
    enabled_capabilities: set[str] = Field(default_factory=lambda: {"conversation"})


class RuntimeResult(BaseModel):
    inhabitant: str
    status: Literal["ignored", "responded", "silent", "error"]
    event_id: UUID
    provider: str | None = None
    latency_ms: int | None = None
    reaction: Reaction | None = None
    reason: str | None = None
