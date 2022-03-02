import React, { FC, useState } from "react";
import { Heading, Navbar } from "react-bulma-components";
import { Link } from "react-router-dom";

const MenuBar: FC = (props) => {
  const [menuState, setMenuState] = useState(false);
  const isSignedIn = false; // TODO: in Redux implementieren
  return (
    <>
      {/* Adaption, Quelle: https://react-bulma.io/docs/components/components/navbar/ */}
      <Navbar className="has-shadow" color="primary">
        <Navbar.Brand>
          <Navbar.Item renderAs={Link} to="/">
            <img src="mso-logo.svg" alt="MSO Logo" width="50" height="28" />
            <Heading size={4}>MSO-Aktienspiel</Heading>
          </Navbar.Item>
          <Navbar.Burger onClick={() => setMenuState(!menuState)} />
        </Navbar.Brand>
        <Navbar.Menu className={menuState ? "is-active" : ""}>
          <Navbar.Container align="right">
            <Navbar.Item renderAs={Link} to="/">
              Start
            </Navbar.Item>
            {isSignedIn ? (
              <Navbar.Item renderAs={Link} to="/signout">
                Abmelden
              </Navbar.Item>
            ) : (
              <Navbar.Item renderAs={Link} to="/signin">
                Anmelden
              </Navbar.Item>
            )}
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
