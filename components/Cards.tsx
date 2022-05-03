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
            title={media.title}
            year={media.year}
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
