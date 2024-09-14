import hmac
import hashlib
from os import urandom


def generate_server_secret():
    return urandom(32).hex()


def byte_generator(server_seed, client_seed, nonce, cursor):
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


def generate_hash(server_seed, client_seed):
    hmac_obj = hmac.new(
        server_seed.encode(),
        digestmod=hashlib.sha256,
    )
    hmac_obj.update(client_seed.encode())
    return hmac_obj.hexdigest()


def generate_floats(
    server_seed: str, client_seed: str, nonce: str, cursor: int, count: int
) -> list[float]:
    rng = byte_generator(server_seed, client_seed, nonce, cursor)
    bytes_list = []

    while len(bytes_list) < count * 4:
        bytes_list.append(next(rng))

    floats = []
    for i in range(0, len(bytes_list), 4):
        bytes_chunk = bytes_list[i : i + 4]

        result = 0
        for j, value in enumerate(bytes_chunk):
            divider = 256 ** (j + 1)
            result += value / divider
        floats.append(result)

    return floats


class GlobalNonce:
    _nonce = 0

    @staticmethod
    def get():
        GlobalNonce._nonce += 1
        return str(GlobalNonce._nonce)


__all__ = ["GlobalNonce", "generate_floats"]


if __name__ == "__main__":
    print(generate_floats("1", "1", GlobalNonce.get(), 0, 1))
