import MediaCard from "./MediaCard";

export function Cards({ data, filteredGenres, type, onMarkAsWatched }: Props) {
  return (
    <>
      {data.results
        .filter(({ genres }: any) =>
          filteredGenres.some((genre: any) =>
            genres.includes(genre.toLowerCase())
          )
        )
        .map((movie: any, i: number) => (
          <MediaCard
            key={i}
            type={type}
            traktId={movie.traktId}
            poster_path={movie.poster_path}
            title={movie.title}
            onMarkAsWatched={onMarkAsWatched}
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
}
