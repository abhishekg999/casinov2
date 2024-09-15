import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import CrashGame from "./components/crash/CrashGame";

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex flex-col flex-grow">
                <Header />
                <main className="flex-grow p-4 overflow-y-scroll">
                    <CrashGame />
                </main>
            </div>
        </div>
    )
};

export default App;
