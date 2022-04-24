import React, { FC } from "react";
import { Container } from "react-bulma-components";
import MenuBar from "./MenuBar";
interface LayoutProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <>
      <Container>
        <MenuBar />
      </Container>
      <Container>
        <div className="content" style={props.style}>
          {props.children}
        </div>
      </Container>

      <Container>
        <p style={{ color: "white", textAlign: "center", padding: "20px" }}>
          <strong style={{ color: "white" }}>StockQuest</strong> von Luis
          Moncada (2022)
        </p>
      </Container>
    </>
  );
};

export default Layout;
