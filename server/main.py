from fastapi import FastAPI, APIRouter, WebSocket
from fastapi.responses import Response
from .games.crash import CrashGame
from pydantic import BaseModel
import asyncio

app = FastAPI()


@app.get("/")
async def index():
    return Response(open("index.html").read())


api_router = APIRouter(prefix="/api")


class CrashParams(BaseModel):
    bet: int
    secret: str


@api_router.websocket("/crash/ws")
async def crash_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        data = await websocket.receive_json()
        params = CrashParams(**data)
        game = CrashGame(**params.model_dump())

        async def stream_game():
            sleep_interval = 0.1
            async for value in game.crash_generator():
                await websocket.send_json({"type": "up", "value": value})
                if game.claimed:
                    sleep_interval = max(0.0001, sleep_interval * 0.99)
                await asyncio.sleep(sleep_interval)
            await websocket.send_json(
                {"type": "crash", "value": game.current_multiplier}
            )

        async def handle_input():
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

        stream_game_task = asyncio.create_task(stream_game())
        handle_input_task = asyncio.create_task(handle_input())
        done, _ = await asyncio.wait(
            [stream_game_task, handle_input_task], return_when=asyncio.FIRST_COMPLETED
        )

        if stream_game_task in done:
            handle_input_task.cancel()
        else:
            await stream_game_task

    except Exception as e:
        await websocket.send_json({"error": str(e)})

    finally:
        await websocket.close()


app.include_router(api_router)
