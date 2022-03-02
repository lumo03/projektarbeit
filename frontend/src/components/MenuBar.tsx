import React, { FC, useState } from "react";
import { Menu, Navbar } from "react-bulma-components";

const MenuBar: FC = (props) => {
  const [menuState, setMenuState] = useState(false);
  const isSignedIn = false; // TODO: in Redux implementieren
  return (
    <>
      {/* Adaption, Quelle: https://react-bulma.io/docs/components/components/navbar/ */}
      <Navbar className="has-shadow" color="primary">
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            MSO-Aktienspiel
          </Navbar.Item>
          <Navbar.Burger onClick={() => setMenuState(!menuState)} />
        </Navbar.Brand>
        <Navbar.Menu className={menuState ? "is-active" : ""}>
          <Navbar.Container align="right">
            <Navbar.Item>Start</Navbar.Item>
            {isSignedIn ? (
              <Navbar.Item>Abmelden</Navbar.Item>
            ) : (
              <Navbar.Item>Anmelden</Navbar.Item>
            )}
            <Navbar.Item>Über</Navbar.Item>
            <Navbar.Item>Impressum</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </>
  );
};

export default MenuBar;
