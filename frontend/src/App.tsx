import { FC } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import About from "./pages/About";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Imprint from "./pages/Imprint";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import SignUp from "./pages/SignUp";

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Routing />
      </Router>
    </div>
  );
};

const Routing: FC = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    { path: "home", element: <Home /> },
    { path: "about", element: <About /> },
    { path: "imprint", element: <Imprint /> },
    { path: "signin", element: <SignIn /> },
    { path: "signout", element: <SignOut /> },
    { path: "signup", element: <SignUp /> },
    { path: "/*", element: <Error /> },
  ]);

export default App;
