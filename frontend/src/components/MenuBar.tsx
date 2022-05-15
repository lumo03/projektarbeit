import React, { FC, useState } from "react";
import { Heading, Navbar } from "react-bulma-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux-store";

const MenuBar: FC = (props) => {
  const [menuState, setMenuState] = useState(false);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  return (
    <>
      {/* Adaption, Quelle: https://react-bulma.io/docs/components/components/navbar/ */}
      <Navbar
        className="m-0"
        color="black"
        style={{ backgroundColor: "black" }}
      >
        <Navbar.Brand>
          <Navbar.Item renderAs={Link} to="/">
            <img
              src="/mso-logo-white.svg"
              alt="MSO Logo"
              width="50"
              height="28"
            />
            <Heading size={4} style={{ color: "white" }}>
              StockQuest
            </Heading>
          </Navbar.Item>
          <Navbar.Burger onClick={() => setMenuState(!menuState)} />
        </Navbar.Brand>
        <Navbar.Menu className={menuState ? "is-active" : ""}>
          <Navbar.Container align="right">
            {isSignedIn ? (
              <Navbar.Item renderAs={Link} to="/app/dashboard">
                Dashboard
              </Navbar.Item>
            ) : (
              <Navbar.Item renderAs={Link} to="/">
                Start
              </Navbar.Item>
            )}

            {isSignedIn ? (
              <Navbar.Item renderAs={Link} to="/signout">
                Abmelden
              </Navbar.Item>
            ) : (
              <Navbar.Item renderAs={Link} to="/signin">
                Anmelden
              </Navbar.Item>
            )}
            {/*}
            <Navbar.Item renderAs={Link} to="/game">
              Spiel
            </Navbar.Item>*/}
            <Navbar.Item renderAs={Link} to="/about">
              Über
            </Navbar.Item>
            <Navbar.Item renderAs={Link} to="/imprint">
              Impressum
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </>
  );
};

export default MenuBar;
