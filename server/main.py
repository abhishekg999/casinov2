from fastapi import FastAPI, APIRouter


app = FastAPI()
api_router = APIRouter(prefix="/api")

from crash_handler import crash_ws

api_router.add_api_websocket_route("/crash/ws", crash_ws)

app.include_router(api_router)
