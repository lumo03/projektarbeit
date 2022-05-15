import { FC } from "react";
import "./App.css";
import Router from "./components/Router";

const App: FC = () => {
  document.body.classList.add("background-black");
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <Router />
    </div>
  );
};

export default App;
