import Link from "next/link";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={styles.headerNav}>
      <ul className={styles.headerNavList}>
        <li>
          <Link href="#" className={styles.headerNavLink}>
            {" "}
            Список лидеров
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
