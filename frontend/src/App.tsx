import { FC, useEffect } from "react";
import Router from "./components/Router";
import { useRoutes } from "react-router";
import Routes from "./components/Router";
import { useAppSelector } from "./components/hooks";
import io from "socket.io-client";

const App: FC = () => {
  const socket = io("http://localhost:8000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to socket");
    });
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
