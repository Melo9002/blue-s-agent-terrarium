import unittest

from pydantic import ValidationError

from agent_terrarium.inhabitants import INHABITANTS
from agent_terrarium.models import Event, Reaction
from agent_terrarium.providers import MockProvider
from agent_terrarium.runtime import AgentRuntime


class RuntimeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.runtime = AgentRuntime(MockProvider())

    def test_important_event_reaches_both_inhabitants(self) -> None:
        event = Event(
            type="game.discovery",
            source="test",
            importance=0.9,
            payload={"text": "A hidden room"},
        )
        for inhabitant in INHABITANTS.values():
            with self.subTest(inhabitant=inhabitant.id):
                result = self.runtime.handle(inhabitant, event)
                self.assertEqual(result.status, "responded")
                self.assertEqual(result.provider, "mock")
                self.assertTrue(result.reaction.should_speak)

    def test_noise_is_ignored_by_both_inhabitants(self) -> None:
        event = Event(
            type="game.footstep",
            source="test",
            importance=0.1,
            payload={"text": "One step"},
        )
        for inhabitant in INHABITANTS.values():
            with self.subTest(inhabitant=inhabitant.id):
                result = self.runtime.handle(inhabitant, event)
                self.assertEqual(result.status, "ignored")
                self.assertIsNone(result.reaction)

    def test_event_importance_must_be_normalized(self) -> None:
        with self.assertRaises(ValidationError):
            Event(type="test", source="test", importance=1.1)

    def test_silent_reaction_cannot_contain_text(self) -> None:
        with self.assertRaises(ValidationError):
            Reaction(should_speak=False, text="Hi", emotion="quiet")


if __name__ == "__main__":
    unittest.main()
