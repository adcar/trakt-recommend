//import styles from "../styles/Rating.module.scss";

export function Year({ year, type, status, lastEpisodeDate, style }: Props) {
  if (type === "movies") {
    return <p {...style}>{year}</p>;
  } else {
    if (status === "returning series") {
      return <p {...style}>{year}-Present</p>;
    } else if (status === "ended" && lastEpisodeDate !== null) {
      const lastYear = lastEpisodeDate.slice(0, 4);
      if (lastYear === year.toString()) {
        return <p {...style}>{year} (Ended)</p>;
      } else {
        return (
          <p {...style}>
            {year}-{lastYear}
          </p>
        );
      }
    } else {
      return <p {...style}>{year}</p>;
    }
  }
}

interface Props {
  year: number;
  status: string | null;
  lastEpisodeDate: string | null;
  type: "movies" | "shows";
  style?: any;
}
