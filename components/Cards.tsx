import MediaCard from "./MediaCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

export function Cards({
  data,
  filteredGenres,
  type,
  onMarkAsWatched,
  onMarkAsHidden,
}: Props) {
  const [results, setResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const filteredResults = data.results.filter(({ genres }: any) =>
      filteredGenres.some((genre: any) => genres.includes(genre.toLowerCase()))
    );

    setAllResults(filteredResults);
    setResults(filteredResults.slice(0, 20));
    setPage(2);
    if (results.length !== filteredResults.length) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data, filteredGenres]);

  function getResults() {
    console.log("page: " + page);
    if (allResults.length > 20 * page) {
      setResults(allResults.slice(0, 20 * page));
      setPage(page + 1);
    } else {
      setResults(allResults);
      setHasMore(false);
    }
  }


  return (
    <>
      <InfiniteScroll
        dataLength={results.length} //This is important field to render the next data
        next={getResults}
        hasMore={allResults.length === results.length ? false : hasMore}
        loader={<h4>Loading...</h4>}
      >
        {results.map((media: any, i: number) => (
          <MediaCard
            key={media.ids.trakt}
            type={type}
            traktId={parseInt(media.ids.trakt)}
            poster_path={media.poster_path}
            backdrop_path={media.backdrop_path}
            certification={media.certification}
            rating={media.rating}
            title={media.title}
            year={media.year}
            network={type === "shows" ? media.network : null}
            status={type === "shows" ? media.status : null}
            runtime={type === "shows" ? media.runtime : null}
            production_companies={
              type === "movies" ? media.production_companies : null
            }
            genres={media.genres}
            overview={media.overview}
            lastEpisodeDate={type === "shows" ? media.lastEpisodeDate : null}
            season_count={type === "shows" ? media.season_count : null}
            onMarkAsWatched={onMarkAsWatched}
            onMarkAsHidden={onMarkAsHidden}
          />
        ))}
      </InfiniteScroll>
      {!hasMore ||
      (results.length === 0 && !hasMore) ||
      (allResults.length === results.length && results.length !== 0) ? (
        <div
          style={{
            padding: "50px 0",
          }}
        >
          {filteredGenres.length !== 0 ? (
            <>
              {" "}
              <h2 style={{ textAlign: "center", marginBottom: 0 }}>
                <b>That's it!</b>
              </h2>
              <p style={{ textAlign: "center" }}>
                Try changing your genres if there aren't enough results
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {filteredGenres.length === 0 ? (
        <div
          style={{
            padding: "50px 0",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 0 }}>
            <b>Start selecting some genres!</b>
          </h2>
          <p style={{ textAlign: "center" }}>
            It looks like you don't have any genres selected. Start selecting
            some to see results here
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

interface Props {
  data: any;
  filteredGenres: string[];
  type: "shows" | "movies";
  onMarkAsWatched: any;
  onMarkAsHidden: any;
}
