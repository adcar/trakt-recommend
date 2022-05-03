import styles from "../styles/MovieCard.module.scss";
import {
  RiCheckLine,
  RiCloseLine,
  RiHeartLine,
  RiInformationLine,
} from "react-icons/ri";
import { Button, IconButton, Modal, Tooltip } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { Rating } from "./Rating";
import { Year } from "./Year";

export default function MediaCard({
  poster_path,
  backdrop_path,
  traktId,
  type,
  title,
  year,
  rating,
  certification,
  network,
  runtime,
  production_companies,
  overview,
  genres,
  lastEpisodeDate,
  status,
  season_count,
  onMarkAsWatched,
  onMarkAsHidden,
}: Props) {
  let companies = "";
  if (production_companies !== null) {
    companies = production_companies.slice(0, 2).join(", ");
  }
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
              <Tooltip title="Add to watchlist" placement={"top"}>
                <IconButton>
                  <RiHeartLine />
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
        BackdropProps={{ style: { backdropFilter: "blur(10px)" } }}
      >
        <div
          className={styles.modal}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/w780/${backdrop_path})`,
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            className={styles.modalClose}
          >
            <RiCloseLine />
          </IconButton>
          <h2>{title}</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              paddingRight: 40,
              fontWeight: 700,
            }}
          >
            <Rating rating={rating} />
            <Year
              style={{ style: { margin: 10 } }}
              year={year}
              type={type}
              lastEpisodeDate={lastEpisodeDate}
              status={status}
            />
            <p style={{ margin: 10 }}>{certification}</p>
            <p style={{ margin: 10 }}>
              {type === "shows" ? network : companies}
            </p>
          </div>
          <p style={{ fontSize: "11pt" }}>
            {type === "shows" && season_count !== null
              ? parseInt(season_count) > 1
                ? season_count + " Seasons"
                : season_count + " Season"
              : ""}

            {type === "shows" && runtime !== null
              ? " - " + runtime + "mins"
              : ""}
          </p>
          <p className={styles.genres}>
            {genres
              .map((genre) => {
                if (genre === "science-fiction") return "Sci-Fi";
                return genre;
              })
              .join(", ")}
          </p>

          <p className={styles.overview}>{overview}</p>

          <div className={styles.modalToolbar}>
            <a
              href={`https://trakt.tv/${type}/${traktId}`}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Button color="inherit" startIcon={<RiInformationLine />}>
                More info
              </Button>
            </a>

            <Button
              color="inherit"
              startIcon={<RiCheckLine />}
              onClick={() => {
                setOpen(false);
                onMarkAsWatched(type, traktId);
              }}
            >
              Mark as watched
            </Button>
            <Button
              color="inherit"
              startIcon={<RiCloseLine />}
              onClick={() => {
                setOpen(false);
                onMarkAsHidden(type, traktId);
              }}
            >
              Not interested
            </Button>
            <Button color="inherit" startIcon={<RiHeartLine />}>
              Add to watchlist
            </Button>
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
  rating: number;
  genres: string[];
  overview: string;
  certification: string;
  type: "shows" | "movies";
  onMarkAsWatched: any;
  onMarkAsHidden: any;

  // TV Show stuff
  lastEpisodeDate: string | null;
  status: string | null;
  network: string | null;
  season_count: string | null;
  runtime: string | null;

  // Movie stuff
  production_companies: string[] | null;
}
