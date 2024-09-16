import math
from .utils import generate_hash, generate_server_secret


def generate_multiplier(server_seed: str, client_seed: str) -> float:
    hash = generate_hash(server_seed, client_seed)
    int_value = int(hash[:8], 16)
    crashpoint = max(1, (2**32 / (int_value + 1)) * (1 - 0.01))
    return math.trunc(crashpoint * 100) / 100

class CrashGame:
    def __init__(self, bet: int, secret: str):
        self._multiplier = generate_multiplier(generate_server_secret(), secret)

        self.bet = bet
        self.current_multiplier = None
        self.state = "waiting"
        self.claimed = False

    async def crash_generator(self):
        self.state = "playing"
        for i in range(100, int(self._multiplier * 100) + 1, 1):
            self.current_multiplier = i / 100
            yield i / 100

        self.state = "crashed"
        self.current_multiplier = 0
