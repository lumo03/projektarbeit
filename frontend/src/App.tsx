import { FC } from "react";
import Router from './Router';
import { useRoutes } from "react-router";
import Routes from "./Router";
import { useAppSelector } from "./components/hooks";

const App: FC = () => {
  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
