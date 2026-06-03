import { useState } from "react";
import Convert from "./Convert";
import GetList from "./GetList";
import Graf from "./Graf";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Betting from "./Betting";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
        <header className="bg-blue-100 shadow-sm border-b border-blue-200">
          <h1 className="text-center p-1 text-4xl font-bold text-blue-900 tracking-wide">
            <Link
              to="/"
              className="link-offset-2 link-underline link-underline-opacity-0"
            >
              Money<em className="text-blue-600 not-italic">X</em>change
            </Link>
          </h1>

          <h2 className="text-center text-4xl font-bold text-blue-900 tracking-wide">
            <Link
              to="/Trading"
              className="link-offset-2 link-underline link-underline-opacity-0"
            >
              Trading
            </Link>
          </h2>
        </header>

        <main className="flex-grow flex flex-col items-center p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center gap-8 w-full">
                  <div className="flex flex-row flex-wrap gap-8 justify-center items-start w-full">
                    <Convert />
                    <GetList />
                  </div>
                  <Graf />
                </div>
              }
            />

            <Route path="/trading" element={<Betting />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-gray-300 text-center p-5 mt-auto">
          <p className="text-sm tracking-wide">
            &copy; 2026 MoneyXchange. Alla rättigheter förbehållna.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
