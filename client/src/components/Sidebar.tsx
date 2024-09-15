import { Menu, Star, Clock, Gift, Flame, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
    return (
        <aside className={`${isOpen ? 'w-64' : 'w-16'} bg-gray-800 overflow-y-auto flex flex-col`}>
            <div className="p-4">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`bg-green-500 p-2 text-white rounded`}
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
            <nav className="mt-8 flex-grow flex flex-col gap-2 overflow-hidden">
                <SidebarItem icon={<Star />} text="Favourites" isOpen={isOpen} />
                <SidebarItem icon={<Clock />} text="Recent" isOpen={isOpen} />
                <SidebarItem icon={<Gift />} text="Challenges" isOpen={isOpen} />
                <SidebarItem icon={<Flame />} text="My Game Play" isOpen={isOpen} />
                <SidebarItem icon={<Zap />} text="Slot Games" isOpen={isOpen} />
            </nav>
        </aside>
    )
}

function SidebarItem({ icon, text, isOpen }: { icon: React.ReactNode; text: string; isOpen: boolean }) {
    return (
        <div className="flex items-center px-4 pl-5 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
            {icon}
            {isOpen && <span className="ml-4">{text}</span>}
        </div>
    )
}