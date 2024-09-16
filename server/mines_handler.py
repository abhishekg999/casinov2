from fastapi import WebSocket
from games.mines import MinesGame
from pydantic import BaseModel
import asyncio

class MinesParams(BaseModel):
    bet: int
    secret: str
    mine_count: int
    

async def mines_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        data = await websocket.receive_json()
        params = MinesParams(**data)
        game = MinesGame(**params.model_dump())
        
        while True:
            data = await websocket.receive_json()
            if "action" not in data:
                continue
            if data["action"] == "claim" and game.state == "playing":
                await websocket.send_json(
                    {
                        "type": "claim",
                        "value": round(game.bet * game.current_multiplier, 2),
                    }
                )
                game.claimed = True
                return