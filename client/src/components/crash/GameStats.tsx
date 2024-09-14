import React from 'react';

interface GameStatsProps {
    currentValue: number;
    crashed: boolean;
    gameStarted: boolean;
    claimed: boolean;
    claimedAmount: number;
    getCurrentGains: () => string;
}

const GameStats: React.FC<GameStatsProps> = ({
    currentValue, crashed, gameStarted, claimed, claimedAmount, getCurrentGains
}) => {
    const getCurrentColor = () => {
        if (crashed) return 'text-red-500';
        if (!gameStarted) return 'text-gray-400';
        return 'text-green-500';
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className={`text-6xl font-bold ${getCurrentColor()}`}>
                {currentValue.toFixed(2)}x
            </div>
            {gameStarted && (
                <div className="text-lg mt-4">
                    Current Profit: ${getCurrentGains()}
                </div>
            )}
            {claimed && (
                <div className="text-lg mt-4">
                    Claimed: ${claimedAmount.toFixed(2)}
                </div>
            )}
        </div>
    );
};

export default GameStats;
