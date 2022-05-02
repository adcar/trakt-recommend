import { trakt } from "../utils/api";
import { withSessionSsr } from "../utils/withSession";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await router.push("/type-select");
    })();
  });

  return;
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }: any) {
    try {
      await trakt.exchange_code(query.code);

      req.session.token = await trakt.export_token();
      await req.session.save();

      return { props: {} };
    } catch (e) {
      console.log(e);
      throw Error("Authentication failure");
    }
  }
);
