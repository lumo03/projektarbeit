import { FC, useEffect } from "react";
import Router from "./components/Router";
import { useRoutes } from "react-router";
import Routes from "./components/Router";
import { useAppSelector } from "./components/hooks";
import "./App.css";

const App: FC = () => {
  document.body.classList.add("background-black");
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <Router />
    </div>
  );
};

export default App;
