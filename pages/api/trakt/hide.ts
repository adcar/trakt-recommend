import { withSessionRoute } from "../../../utils/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { trakt } from "../../../utils/api";

export default withSessionRoute(recommendations);
type Data = {
  success: boolean;
  results?: any[];
};

async function recommendations(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //@ts-ignore
  await trakt.import_token(req.session.token);
  const { type, id } = req.query;
  if (!type || !id || typeof type !== "string") {
    return res.json({ success: false });
  }

  let response;
  if (type === "shows") {
    response = await trakt.recommendations.shows.hide({ id });
  }

  if (type === "movies") {
    response = await trakt.recommendations.movies.hide({ id });
  }

  console.log(response);
  res.json({ success: true });
}
