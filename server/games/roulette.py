import math
from .utils import float_generator, byte_generator, GlobalNonce


def generate_pocket(server_seed, client_seed) -> int:
    rng = byte_generator(server_seed, client_seed, GlobalNonce.get(), 0)
    return math.floor(float_generator(rng, 37))
