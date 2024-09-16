from fastapi import WebSocket
from games.mines import MinesGame
from pydantic import BaseModel
import asyncio

class MinesParams(BaseModel):
    bet: int
    secret: str
    mine_count: int
    
