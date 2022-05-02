import { withSessionRoute } from "../../../utils/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { tmdb, trakt } from "../../../utils/api";

export default withSessionRoute(recommendations);
type Data = {
  success: boolean;
  results?: any[];
};

const traktOptions = {
  ignore_collected: true,
  limit: 200, // 25 should be changed to 200 in prod.
  extended: "full",
};

async function recommendations(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //@ts-ignore
  await trakt.import_token(req.session.token);

  if (req.query.type === "movies") {
    const recommendations = await trakt.recommendations.movies.get(
      traktOptions
    );

    let tmdbPromises: Promise<any>[] = [];

    recommendations.forEach((rec: any) => {
      tmdbPromises.push(
        tmdb.movieInfo({ id: rec.ids.tmdb }).then((result: any) => ({
          traktId: rec.ids.trakt,

          ...result,
          genres: rec.genres,
          title: rec.title,
        })) // Append traktId to TMDB result for later use and append Trakt genres because they're formatted better
      );
    });

    return res.json({
      success: true,
      results: await Promise.all(tmdbPromises),
    });
  } else if (req.query.type === "shows") {
    const recommendations = await trakt.recommendations.shows.get(traktOptions);

    let tmdbPromises: Promise<any>[] = [];

    recommendations.forEach((rec: any) => {
      tmdbPromises.push(
        tmdb.tvInfo({ id: rec.ids.tmdb }).then((result: any) => ({
          traktId: rec.ids.trakt,
          ...result,
          genres: rec.genres,
          title: rec.title,
        })) // Append traktId to TMDB result for later use
      );
    });

    return res.json({
      success: true,
      results: await Promise.all(tmdbPromises),
    });
  } else {
    res.json({ success: false });
  }
}
