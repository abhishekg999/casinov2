import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BetControlsProps {
    bet: number;
    setBet: (value: number) => void;
    cashoutAt: number;
    setCashoutAt: (value: number) => void;
    gameStarted: boolean;
    startGame: () => void;
    claim: () => void;
}

const BetControls: React.FC<BetControlsProps> = ({
    bet, setBet, cashoutAt, setCashoutAt, gameStarted, startGame, claim
}) => (
    <div>
        <div className="flex justify-between mb-4">
            <Button variant="ghost" className="w-1/2 bg-[#2A3C48]">Manual</Button>
            <Button variant="ghost" className="w-1/2">Auto</Button>
        </div>
        <div className="mb-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Bet Amount</label>
            <Input
                type="number"
                value={bet}
                onChange={(e) => setBet(parseFloat(e.target.value))}
                className="bg-[#2A3C48] border-[#3A4C58] text-white"
                readOnly={gameStarted}
            />
        </div>
        <div className="flex justify-between mb-4">
            <Button variant="ghost" className="w-1/4 bg-[#2A3C48]" onClick={() => setBet(bet / 2)} disabled={gameStarted}>1/2</Button>
            <Button variant="ghost" className="w-1/4 bg-[#2A3C48]" onClick={() => setBet(bet * 2)} disabled={gameStarted}>2x</Button>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Auto Cashout At</label>
            <Input
                type="number"
                value={cashoutAt}
                onChange={(e) => setCashoutAt(parseFloat(e.target.value))}
                className="bg-[#2A3C48] border-[#3A4C58] text-white"
                readOnly={gameStarted}
            />
        </div>
        <Button
            onClick={gameStarted ? claim : startGame}
            className="w-full bg-[#00A341] hover:bg-[#008C36] text-white"
        >
            {gameStarted ? 'Cash Out' : 'Play (Next Round)'}
        </Button>
    </div>
);

export default BetControls;
