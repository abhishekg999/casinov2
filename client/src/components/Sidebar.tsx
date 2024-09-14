import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`bg-[#1A2C38] transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} h-full`}>
            <div className="p-4">
                <Button variant="ghost" onClick={toggleSidebar}>
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </Button>
            </div>
            <div className="p-4">
                {isOpen && (
                    <>
                        <p className="text-gray-400">Games</p>
                        <ul>
                            <li>Crash</li>
                            <li>Slot Games</li>
                            <li>Live Dealers</li>
                            {/* Add other navigation items here */}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};
