import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, Maximize2, BarChart2 } from 'lucide-react';

const Header: React.FC = () => (
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">Crash</h1>
    <div className="flex space-x-2">
      <Button variant="ghost"><Settings size={20} /></Button>
      <Button variant="ghost"><Maximize2 size={20} /></Button>
      <Button variant="ghost"><BarChart2 size={20} /></Button>
    </div>
  </div>
);

export default Header;
