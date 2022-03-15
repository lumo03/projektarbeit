import { FC } from "react";
import element from "react-bulma-components/src/components/element";
import { Navigate, RouteObject, useRoutes } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Imprint from "./pages/Imprint";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import DashboardLayout from "./pages/DashboardLayout";
import { useAppSelector } from "./components/hooks";

interface IRoutes {
  isSignedIn: boolean
}

const Routes = ({isSignedIn}: IRoutes) => useRoutes([
    {
      path: "/app", 
      element: !isSignedIn && <SignIn />,
      children: [
        {path: "/dashboard", element: <Dashboard /> },
        {path: "/account", element: <Account />},
        {path: "/settings", element: <Settings />}
      ]
    },
    {path: "/", element: !isSignedIn ? <Home /> : <Navigate to="/app/dashboard" />},
    {path: "/signin", element: !isSignedIn ? <SignIn /> : <Navigate to="/app/dashboard" />},
    {path: "/signout", element: isSignedIn ? <SignOut /> : <Navigate to="/" />},
    {path: "/signup", element: !isSignedIn ? <SignUp /> : <Navigate to="/app/dashboard" />},
    {path: "/account", element: isSignedIn ? <Account /> : <Navigate to="/signin" />},
    {path: "/about", element: <About />},
    {path: "/imprint", element: <Imprint />},
    {path: "/*", element: <Error />}
  ])

  const Router: FC = () => {
    const isSignedIn = useAppSelector(state => state.user.isSignedIn)
    return (
      <BrowserRouter>
       <Routes isSignedIn />
      </BrowserRouter>
    )
  }

  export default Router;