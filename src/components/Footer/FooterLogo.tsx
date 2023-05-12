import Image from "next/image";
import styles from "./FooterLogo.module.css";
import Link from "next/link";

const FooterLogo = () => {
  return (
    <Link href={"/"}>
      <Image
        className={styles.footerLogo}
        priority
        height={120}
        width={120}
        src="/mainLogo2.png"
        alt="logo"
      />
    </Link>
  );
};

export default FooterLogo;
