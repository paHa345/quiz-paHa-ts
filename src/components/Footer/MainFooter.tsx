import FooterCopyright from "./FooterCopyright";
import FooterInfo from "./FooterInfo";
import FooterLogo from "./FooterLogo";
import FooterSocial from "./FooterSocial";
import styles from "./MainFooter.module.css";

const MainFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGridContainer}>
          <div className={styles.footerSocial}>
            <FooterLogo></FooterLogo>
            <FooterSocial></FooterSocial>
          </div>
          <FooterInfo></FooterInfo>
          <div></div>
          <FooterCopyright></FooterCopyright>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
