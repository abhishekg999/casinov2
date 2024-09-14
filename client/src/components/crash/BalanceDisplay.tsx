import React from 'react';

interface BalanceDisplayProps {
    balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => (
    <div className="mt-4 text-right">
        <p className="text-xl">Balance: ${balance.toFixed(2)}</p>
    </div>
);

export default BalanceDisplay;
