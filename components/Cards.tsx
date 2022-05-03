import MediaCard from "./MediaCard";

export function Cards({
  data,
  filteredGenres,
  type,
  onMarkAsWatched,
  onMarkAsHidden,
}: Props) {
  return (
    <>
      {data.results
        .filter(({ genres }: any) =>
          filteredGenres.some((genre: any) =>
            genres.includes(genre.toLowerCase())
          )
        )
        .map((media: any, i: number) => (
          <MediaCard
            key={i}
            type={type}
            traktId={media.ids.trakt}
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
