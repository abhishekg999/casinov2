import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import CrashGame from "./components/crash/CrashGame";

const App: React.FC = () => {
    
    return (
        <div className="flex h-screen bg-[#1a2b37] text-white">
            <Sidebar  />
            <div className="flex flex-col flex-grow">
                <Header />
                <main className="flex-grow p-4 overflow-y-scroll">
                    <div className="max-w-[1280px] mx-auto p-8">
                        <CrashGame />
                    </div>
                </main>
            </div>
        </div>
    )
};

export default App;
