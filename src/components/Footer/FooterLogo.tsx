import Image from "next/image";
import styles from "./FooterLogo.module.css";

const FooterLogo = () => {
  return (
    <Image
      className={styles.footerLogo}
      priority
      height={120}
      width={120}
      objectFit="cover"
      src="/logo.png"
      alt="logo"
    />
  );
};

export default FooterLogo;
