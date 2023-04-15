import styles from "./FooterInfo.module.css";

const FooterInfo = () => {
  return (
    <div className={styles.footerSection}>
      <p className={styles.footerMainText}>Адрес</p>
      <ul className={styles.footerText}>
        <li>г.Новосибирск</li>
        <li>ул. Ленина дом 13</li>
        <li>9231271059</li>
      </ul>
    </div>
  );
};

export default FooterInfo;
