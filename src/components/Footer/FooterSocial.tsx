import styles from "./FooterSocial.module.css";
import { faUser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterSocial = () => {
  return (
    <div className={styles.socialIcons}>
      {/* <Link href="/">
        <FontAwesomeIcon icon={faUser} size="4x" />
      </Link>
      <Link href="/">
        <FontAwesomeIcon icon={faThumbsUp} size="4x" />
      </Link>{" "} */}
    </div>
  );
};

export default FooterSocial;
