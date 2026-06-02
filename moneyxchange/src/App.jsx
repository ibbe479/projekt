import { useState } from "react";
import Convert from "./Convert";
import GetList from "./GetList";
import Graf from "./Graf";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-100 shadow-sm border-b border-blue-200">
        <h1 className="text-center p-6 text-4xl font-bold text-blue-900 tracking-wide">
          Money<em className="text-blue-600 not-italic">X</em>change
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center p-8">
        <div className="flex flex-row flex-wrap gap-8 justify-center items-start w-full">
          <Convert />
          <GetList />
        </div>

        <Graf />
      </main>

      <footer className="bg-gray-800 text-gray-300 text-center p-5 mt-auto">
        <p className="text-sm tracking-wide">
          &copy; 2026 MoneyXchange. Alla rättigheter förbehållna.
        </p>
      </footer>
    </div>
  );
}

export default App;
