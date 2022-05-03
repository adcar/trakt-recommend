import styles from "../styles/MovieCard.module.scss";
import {
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiStarLine,
} from "react-icons/ri";
import { IconButton, Modal, Tooltip } from "@mui/material";
import { useState } from "react";

export default function MediaCard({
  poster_path,
  traktId,
  type,
  title,
  year,
  onMarkAsWatched,
  onMarkAsHidden,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={styles.card}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w185/${poster_path})`,
            transition: "all 0.25s ease-in-out",
          }}
          onClick={() => setOpen(true)}
        >
          <div className={styles.cardActions}>
            <div className={styles.toolbar}>
              <Tooltip title="Mark as watched">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsWatched(type, traktId);
                  }}
                >
                  <RiCheckLine />
                </IconButton>
              </Tooltip>
              <Tooltip title="Not interested">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
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
        <p className={styles.title} title={`${title} (${year})`}>
          {title} ({year})
        </p>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <h2>hi</h2>
        </div>
      </Modal>
    </>
  );
}

interface Props {
  year: number;
  title: string;
  poster_path: string;
  traktId: number;
  type: "shows" | "movies";
  onMarkAsWatched: any;
  onMarkAsHidden: any;
}
