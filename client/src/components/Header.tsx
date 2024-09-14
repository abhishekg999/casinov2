import { Menu, Settings } from 'lucide-react';

export const Header = () => {
    return (
        <header>
            <Menu size={24} /> {/* Menu icon */}
            <h1>Stake Clone</h1>
            <Settings size={24} /> {/* Settings icon */}
        </header>
    );
}

