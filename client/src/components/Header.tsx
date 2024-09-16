import { Button } from '@/components/ui/button'
import { useState } from 'react';

export function Header() {
    const [signedIn, setSignedIn] = useState(false);

    return (
        <header className="bg-[#1a2c38] p-4 flex items-center justify-between sticky top-0 z-10 h-16 shadow-lg">
            <div className='flex items-center w-full max-w-[1280px] mx-auto'>
                <h1 className="text-2xl font-bold">Ahh Casino</h1>
                <div className="flex-grow mx-4">
                    <div className="relative">
                        {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" /> */}
                        {/* <Input type="text" placeholder="Search your game" className="pl-8 bg-gray-700 border-gray-600 text-white" /> */}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {signedIn ? (
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost">Account</Button>
                            <Button variant="ghost" onClick={() => setSignedIn(false)}>Sign Out</Button>
                        </div>
                    ) : (
                        <>
                            <Button variant="ghost" onClick={() => setSignedIn(true)}>Sign In</Button>
                            <Button variant="ghost">Register</Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}