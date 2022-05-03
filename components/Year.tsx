//import styles from "../styles/Rating.module.scss";

export function Year({ year, type, status, lastEpisodeDate }: Props) {
  if (type === "movies") {
    return <p>{year}</p>;
  } else {
    if (status === "returning series") {
      return <p>{year}-Present</p>;
    } else if (status === "ended" && lastEpisodeDate !== null) {
      const lastYear = lastEpisodeDate.slice(0, 4);
      if (lastYear === year.toString()) {
        return <p>{year} (Ended)</p>;
      } else {
        return (
          <p>
            {year}-{lastYear}
          </p>
        );
      }
    } else {
      return <p>{year}</p>;
    }
  }
}

interface Props {
  year: number;
  status: string | null;
  lastEpisodeDate: string | null;
  type: "movies" | "shows";
}
