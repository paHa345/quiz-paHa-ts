import Image from "next/image";
import styles from "./HeaderLogo.module.css";
import Link from "next/link";

const HeaderLogo = () => {
  return (
    <Link href="/" className={styles.headerLogo}>
      <Image
        className={styles.headerImg}
        priority
        height={120}
        width={120}
        objectFit="cover"
        src="/logo.png"
        alt="logo"
      ></Image>
    </Link>
  );
};

export default HeaderLogo;
