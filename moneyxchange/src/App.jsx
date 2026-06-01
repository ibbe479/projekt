import { useState } from "react";
import Convert from "./Convert";
import GetList from "./GetList";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-[calc(100vh+50px)] bg-white text-black">
      <header>
        <h1
          id="rubrik"
          className="text-center p-3 mb-2 bg-primary-subtle text-primary-emphasis"
        >
          Money<em>X</em>change
        </h1>
      </header>

      <div className="d-flex flex-row mb-3 gap-[10vh] justify-content-center">
        <div className="p-2 ">
          <Convert />
        </div>

        <div className="p-2">
          <GetList />
        </div>
      </div>
    </div>
  );
}

export default App;
