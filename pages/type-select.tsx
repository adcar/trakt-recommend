import { trakt } from "../utils/api";
import Twemoji from "react-twemoji";
import genreSelectStyles from "../styles/GenreSelect.module.scss";
import styles from "../styles/TypeSelect.module.scss";

import Link from "next/link";
import { withSessionSsr } from "../utils/withSession";

export default function TypeSelect(userInfo: any) {
  return (
    <>
      <h1 className="large" style={{ textAlign: "center" }}>
        Are you looking for a TV show or a Movie,{" "}
        {userInfo.name !== "" ? userInfo.name : userInfo.username}?
      </h1>
      <Twemoji
        options={{
          className: "twemoji",
          folder: "svg",
          ext: ".svg",
        }}
      >
        <div className={styles.cards}>
          <Link href={"/genre-select?type=shows"}>
            <div
              className={genreSelectStyles.cardWrapper}
              style={{ height: 270 }}
            >
              <div className={genreSelectStyles.card}>
                {"📺"}
                <p style={{ whiteSpace: "nowrap" }}>{"TV Show"}</p>
              </div>
            </div>
          </Link>

          <Link href={"/genre-select?type=movies"}>
            <div
              className={genreSelectStyles.cardWrapper}
              style={{ height: 270 }}
            >
              <div className={genreSelectStyles.card}>
                {"🎬"}
                <p style={{ whiteSpace: "nowrap" }}>{"Movie"}</p>
              </div>
            </div>
          </Link>
        </div>
      </Twemoji>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }: any) {
    await trakt.import_token(req.session.token);
    return { props: await trakt.users.profile({ username: "me" }) };
  }
);
