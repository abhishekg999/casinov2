import math
from .utils import generate_floats, GlobalNonce


def generate_pocket(server_seed, client_seed) -> int:
    return math.floor(
        generate_floats(server_seed, client_seed, GlobalNonce.get(), 0, 37)
    )
