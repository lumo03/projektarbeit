import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "./hooks";
import About from "../pages/About";
import Account from "../pages/Account";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Imprint from "../pages/Imprint";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import SignOut from "../pages/SignOut";
import SignUp from "../pages/SignUp";

const Router: FC = () => {
  const isSignedIn = useAppSelector((state) => state.user.isSignedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <Home /> : <Navigate to="/app/dashboard" />}
        />
        <Route path="/app" element={!isSignedIn && <Navigate to="/signin" />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/account" element={<Account />} />
        <Route path="/app/settings" element={<Settings />} />
        <Route path="/app/*" element={<Navigate to="/error" />} />
        <Route
          path="/signin"
          element={!isSignedIn ? <SignIn /> : <Navigate to="/app/dashboard" />}
        />
        <Route
          path="/signout"
          element={isSignedIn ? <SignOut /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isSignedIn ? <SignUp /> : <Navigate to="/app/dashboard" />}
        />
        <Route
          path="/account"
          element={isSignedIn ? <Account /> : <Navigate to="/signin" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
