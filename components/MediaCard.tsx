import styles from "../styles/MovieCard.module.scss";
import {
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiStarLine,
} from "react-icons/ri";
import { IconButton, Tooltip } from "@mui/material";

export default function MediaCard({
  poster_path,
  traktId,
  type,
  onMarkAsWatched,
  onMarkAsHidden,
}: Props) {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w185/${poster_path})`,
        transition: "all 0.25s ease-in-out",
      }}
    >
      <div className={styles.cardActions}>
        <div className={styles.toolbar}>
          <Tooltip title="Mark as watched">
            <IconButton
              onClick={() => {
                onMarkAsWatched(type, traktId);
              }}
            >
              <RiCheckLine />
            </IconButton>
          </Tooltip>
          <Tooltip title="Not interested">
            <IconButton
              onClick={() => {
                onMarkAsHidden(type, traktId);
              }}
            >
              <RiCloseLine />
            </IconButton>
          </Tooltip>
        </div>
        <div className={styles.toolbar}>
          <Tooltip title="Rate" placement={"top"}>
            <IconButton>
              <RiStarLine />
            </IconButton>
          </Tooltip>
          <Tooltip title="More info" placement={"top"}>
            <IconButton>
              <RiInformationLine />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

interface Props {
  title: string;
  poster_path: string;
  traktId: number;
  type: "shows" | "movies";
  onMarkAsWatched: any;
  onMarkAsHidden: any;
}
