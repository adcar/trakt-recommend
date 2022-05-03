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
            traktId={media.traktId}
            poster_path={media.poster_path}
            title={media.title}
            year={(type === "movies"
              ? media.release_date
              : media.first_air_date
            ).slice(0, 4)}
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
