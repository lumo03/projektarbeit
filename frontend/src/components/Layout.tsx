import React, { FC } from "react";
import MenuBar from "./MenuBar";
interface LayoutProps {
  title: string;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <>
      <MenuBar />
      <div className="content">{props.children}</div>
    </>
  );
};

export default Layout;