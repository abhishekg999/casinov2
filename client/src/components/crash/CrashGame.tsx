import React, { useState, useEffect } from 'react';
import BetControls from './BetControls';
import GameStats from './GameStats';
import BalanceDisplay from './BalanceDisplay';
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Maximize2, BarChart2 } from 'lucide-react';
import { Button } from '../ui/button';



interface GameState {
  type: 'crash' | 'up' | 'claim';
  value: number;
}

const CrashGame: React.FC = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [bet, setBet] = useState<number>(100);
  const [balance, setBalance] = useState<number>(10000);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<number>(1.00);
  const [crashed, setCrashed] = useState<boolean>(false);
  const [cashoutAt, setCashoutAt] = useState<number>(1.05);
  const [claimed, setClaimed] = useState<boolean>(false);
  const [claimedAmount, setClaimedAmount] = useState<number>(0);

  useEffect(() => {
    if (gameStarted && websocket) {
      websocket.onmessage = (event: MessageEvent) => {
        const data: GameState = JSON.parse(event.data);
        if (data.type === 'crash') {
          setCrashed(true);
          handleLoss();
        } else if (data.type === 'up') {
          setCurrentValue(data.value);
        } else if (data.type === 'claim') {
          setBalance((prevBalance) => prevBalance + data.value);
          setGameStarted(false);
          setClaimed(true);
          setClaimedAmount(data.value);
        }
      };
    }
  }, [gameStarted, websocket]);

  const startGame = () => {
    if (!bet) {
      alert('Please enter a bet amount.');
      return;
    }

    const betAmount = bet;
    if (betAmount > balance) {
      alert('Insufficient balance.');
      return;
    }

    setBalance(prevBalance => prevBalance - betAmount);

    if (websocket) {
      websocket.close();
    }

    const ws = new WebSocket('ws://localhost:8000/api/crash/ws');
    setWebsocket(ws);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        bet: betAmount,
        secret: Math.random().toString(36)
      }));
      setGameStarted(true);
      setCrashed(false);
      setClaimed(false);
    };

    ws.onclose = () => {
      setGameStarted(false);
    };

    ws.onerror = (error: Event) => {
      setGameStarted(false);
      console.error('WebSocket error:', error);
    };
  };

  const claim = () => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({ action: 'claim' }));
    }
  };

  const handleLoss = () => {
    setGameStarted(false);
  };

  const getCurrentGains = () => {
    const betAmount = bet;
    return (betAmount * (currentValue - 1)).toFixed(2);
  };

  return (
    <div className="bg-[#0f212e] text-white p-6 rounded-xl">
      <div className="max-w-6xl mx-auto rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Crash</h1>
          <div className="flex space-x-2">
            <Button variant="ghost"><Settings size={20} /></Button>
            <Button variant="ghost"><Maximize2 size={20} /></Button>
            <Button variant="ghost"><BarChart2 size={20} /></Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-[#213743] border-[#2A3C48] col-span-1">
            <CardContent className="p-4">
              <BetControls
                bet={bet}
                setBet={setBet}
                cashoutAt={cashoutAt}
                setCashoutAt={setCashoutAt}
                gameStarted={gameStarted}
                startGame={startGame}
                claim={claim}
              />
            </CardContent>
          </Card>

          <Card className="bg-[#1A2C38] border-[#2A3C48] col-span-2">
            <CardContent className="p-4 h-full flex flex-col justify-center items-center">
              <GameStats
                currentValue={currentValue}
                crashed={crashed}
                gameStarted={gameStarted}
                claimed={claimed}
                claimedAmount={claimedAmount}
                getCurrentGains={getCurrentGains}
              />
            </CardContent>
          </Card>
        </div>

        <BalanceDisplay balance={balance} />
      </div>
    </div>
  );
};

export default CrashGame;
