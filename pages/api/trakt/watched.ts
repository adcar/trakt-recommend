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

  const response = await trakt.sync.history.add({
    [type]: [{ ids: { trakt: id } }],
  });
  console.log(response);
  console.log(type);
  console.log(id);
  res.json({ success: true });
}
