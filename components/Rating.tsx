import Image from "next/image";
import traktLogo from "../public/trakt-logo.png";
import styles from "../styles/Rating.module.scss";

export function Rating(props: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image src={traktLogo} height={30} width={30} alt={"Trakt.tv logo"} />
      <p className={styles.rating}>
        <span className={styles.rate}>
          {Math.round(10 * props.rating) / 10}
        </span>

        <span className={styles.slash}>/</span>

        <span className={styles.decor}>10</span>
      </p>
    </div>
  );
}
