import Image from "next/image";
import styles from "./HeaderLogo.module.css";

const HeaderLogo = () => {
  return (
    <a href="index.html" className={styles.headerLogo}>
      <Image
        className={styles.headerImg}
        priority
        height={120}
        width={120}
        objectFit="cover"
        src="/logo.png"
        alt="logo"
      ></Image>
    </a>
  );
};

export default HeaderLogo;
