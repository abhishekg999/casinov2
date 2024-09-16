from utils import byte_generator, fisher_yates_generator, generate_server_secret

def generate_board(server_seed: str, client_seed: str, mine_count: int) -> list[list[int]]:
    generator = fisher_yates_generator(byte_generator(server_seed, client_seed), range(25))
    board = [[False for _ in range(5)] for _ in range(5)]
    for _ in range(mine_count):
        rand = next(generator)
        x, y = rand // 5, rand % 5
        board[x][y] = True
    return board

MINES_MULTIPLIERS = [
    
]

class MinesGame:
    def __init__(self, bet: int, secret: str, mine_count: int):
        self._board = generate_board(generate_server_secret(), secret, mine_count)
        self._mine_count = mine_count
        
        self.bet = bet
        self.state = "waiting"
        self.claimed = False
        
    
        