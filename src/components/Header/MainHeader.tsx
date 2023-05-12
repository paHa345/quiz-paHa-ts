import { Fragment } from "react";
import styles from "./MainHeader.module.css";
import HeaderLogo from "./HeaderLogo";
import MainNavigation from "./MainNavigation";

const MainHeader = () => {
  console.log(process.env.MONGODB_USERNAME);
  console.log(process.env.SECRET);
  console.log(process.env.MONGODB_DATABASE);
  console.log(process.env.PAHA);

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
