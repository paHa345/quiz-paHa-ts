import { Fragment } from "react";
import styles from "./MainHeader.module.css";
import HeaderLogo from "./HeaderLogo";
import MainNavigation from "./MainNavigation";

const MainHeader = () => {
  console.log(process.env.NEXT_PUBLIC_SECRET);

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
