import { useState } from "react";
import Convert from "./Convert";
import GetList from "./GetList";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Convert />
      <GetList />
    </div>
  );
}

export default App;
