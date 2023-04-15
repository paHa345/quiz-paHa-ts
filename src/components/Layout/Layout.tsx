import { LayoutProps } from "@/types";
import MainHeader from "../Header/MainHeader";
import { Fragment } from "react";
import MainFooter from "../Footer/MainFooter";

const Layout: LayoutProps = ({ children }) => {
  return (
    <Fragment>
      <MainHeader></MainHeader>
      <div>{children}</div>
      <MainFooter></MainFooter>
    </Fragment>
  );
};

export default Layout;
