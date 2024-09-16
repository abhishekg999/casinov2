from math import floor
from typing import Generator
from enum import Enum
from .utils import float_generator, byte_generator, GlobalNonce


class CardSuit(str, Enum):
    DIAMONDS = "DIAMONDS"
    HEARTS = "HEARTS"
    SPADES = "SPADES"
    CLUBS = "CLUBS"


class CardValue(str, Enum):
    TWO = "2"
    THREE = "3"
    FOUR = "4"
    FIVE = "5"
    SIX = "6"
    SEVEN = "7"
    EIGHT = "8"
    NINE = "9"
    TEN = "10"
    JACK = "JACK"
    QUEEN = "QUEEN"
    KING = "KING"
    ACE = "ACE"


Card = tuple[CardSuit, CardValue]
CARDS: list[Card] = []

for cardValue in CardValue.__members__.values():
    for cardSuit in CardSuit.__members__.values():
        CARDS.append((cardValue, cardSuit))

Deck = Generator[str, None, None]


def generate_deck(server_seed: str, client_seed: str) -> Deck:
    rng = byte_generator(server_seed, client_seed, GlobalNonce.get(), 0)
    for index in float_generator(rng, 52):
        yield CARDS[floor(index * 52)]
