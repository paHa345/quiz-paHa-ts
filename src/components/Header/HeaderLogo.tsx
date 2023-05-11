import Image from "next/legacy/image";
import styles from "./HeaderLogo.module.css";
import Link from "next/link";
Image;

const HeaderLogo = () => {
  return (
    <Link href="/" className={styles.headerLogo}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.headerImg}
          height={100}
          width={100}
          layout="responsive"
          src="/mainLogo2.png"
          alt="logo"
        ></Image>
      </div>
    </Link>
  );
};

export default HeaderLogo;
