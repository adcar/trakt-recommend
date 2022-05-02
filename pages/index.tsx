import styles from "../styles/Home.module.scss"
import FancyButton from "../components/FancyButton";
import {trakt} from "../utils/api";

export default function Home({url}: Props) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.large}>Don’t know what to watch?</h1>
      <p className={styles.subtitle}>
        Instantly find movie recommendations tailored to your viewing habits
      </p>
      <div
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FancyButton link={url} message={"Login with Trakt.tv"} />
        {/*TODO: Add a Continue as guest button which will end up using generic "recommended" movies*/}
      </div>
    </div>
  );
}

interface Props {
  url: string;
}


export async function getServerSideProps() {
  return {
    props: {url: trakt.get_url()}, // will be passed to the page component as props
  }
}