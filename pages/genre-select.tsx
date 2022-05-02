import { trakt } from "../utils/api";
import Twemoji from "react-twemoji";
import Link from "next/link";
import styles from "../styles/GenreSelect.module.scss";
import { withSessionSsr } from "../utils/withSession";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import genres from "../utils/genres";

export default function GenreSelect({ userInfo, type }: any) {
  // Pre-fetch. This caches the result for later use
  useSWR("/api/trakt/recommendations?type=" + type, fetcher);
  return (
    <>
      <h1 className="large" style={{ textAlign: "center" }}>
        What genre are you looking
        {/*Use display name if the user has one otherwise fallback to username*/}{" "}
        for, {userInfo.name !== "" ? userInfo.name : userInfo.username}?
      </h1>
      <Twemoji
        options={{
          className: "twemoji",
          folder: "svg",
          ext: ".svg",
        }}
      >
        <div className={styles.cards}>
          {genres.map((genre, i) => (
            <Link href={`/dashboard?type=${type}&genre=${genre.name}`} key={i}>
              <div className={styles.cardWrapper}>
                <div className={styles.card}>
                  <>
                    {genre.icon}
                    <p>{genre.name}</p>
                  </>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Twemoji>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }: any) {
    await trakt.import_token(req.session.token);
    return {
      props: {
        userInfo: await trakt.users.profile({ username: "me" }),
        type: query.type,
      },
    };
  }
);
