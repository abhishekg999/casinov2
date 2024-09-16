import hmac
import hashlib
from os import urandom
from typing import Generator


def generate_server_secret():
    return urandom(32).hex()


class GlobalNonce:
    _nonce = 0

    @staticmethod
    def get():
        GlobalNonce._nonce += 1
        return str(GlobalNonce._nonce)


def generate_hash(server_seed: str, client_seed: str, nonce: str | None = None) -> str:
    if nonce is None:
        nonce = GlobalNonce.get()

    hmac_obj = hmac.new(
        server_seed.encode(),
        digestmod=hashlib.sha256,
    )
    hmac_obj.update(client_seed.encode())
    return hmac_obj.hexdigest()


ByteGenerator = Generator[int, None, None]


def byte_generator(
    server_seed: str, client_seed: str, nonce: str | None = None, cursor: int = 0
) -> ByteGenerator:
    if nonce is None:
        nonce = GlobalNonce.get()

    current_round = cursor // 32
    current_round_cursor = cursor % 32

    while True:
        hmac_obj = hmac.new(
            server_seed.encode(),
            f"{client_seed}:{nonce}:{current_round}".encode(),
            hashlib.sha256,
        )
        buffer = hmac_obj.digest()

        while current_round_cursor < 32:
            yield buffer[current_round_cursor]
            current_round_cursor += 1

        current_round_cursor = 0
        current_round += 1


FloatGenerator = Generator[float, None, None]


def float_generator(rng: ByteGenerator) -> FloatGenerator:
    while True:
        bytes_chunk = [next(rng) for _ in range(4)]

        result = 0
        for j, value in enumerate(bytes_chunk):
            divider = 256 ** (j + 1)
            result += value / divider
        yield result


def fisher_yates_generator(rng: ByteGenerator, _range: range):
    """
    Yields a random permutation of integers [low, high] based on the float generator.
    """
    float_rng = float_generator(rng)

    arr = list(_range)
    arr_len = len(arr)

    while arr_len:
        index = int(next(float_rng) * arr_len)
        yield arr.pop(index)
        arr_len = len(arr)
