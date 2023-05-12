import { Fragment } from "react";
import styles from "./MainHeader.module.css";
import HeaderLogo from "./HeaderLogo";
import MainNavigation from "./MainNavigation";

const MainHeader = () => {
  return (
    <Fragment>
      <header className={styles.header}>
        <HeaderLogo></HeaderLogo>
        <MainNavigation></MainNavigation>
      </header>
    </Fragment>
  );
};

export default MainHeader;
