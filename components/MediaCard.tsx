import styles from "../styles/MovieCard.module.scss";
import {
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiStarLine,
} from "react-icons/ri";
import { IconButton, Modal, Tooltip } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

export default function MediaCard({
  poster_path,
  backdrop_path,
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
          className={styles.container}
          style={{
            transition: "all 0.25s ease-in-out",
          }}
        >
          <Image
            alt={`${title} poster`}
            src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
            width={185}
            height={278}
            className={styles.card}
          />
          <div className={styles.cardActions} onClick={() => setOpen(true)}>
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
        <div
          className={styles.modal}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w780/${backdrop_path})`,
          }}
        >
          <h2>{title}</h2>
          <div>
            <p>rating here</p>
          </div>
        </div>
      </Modal>
    </>
  );
}

interface Props {
  year: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  traktId: number;
  type: "shows" | "movies";
  onMarkAsWatched: any;
  onMarkAsHidden: any;
}
