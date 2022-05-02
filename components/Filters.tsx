import styles from "../styles/Filters.module.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import genres from "../utils/genres";

interface Props {
  filteredGenres: string[];
  onFilterChange: any;
}

export default function Filters({ filteredGenres, onFilterChange }: Props) {
  return (
    <div className={styles.root}>
      <h2>Genres</h2>
      <FormGroup aria-label="position">
        {genres
          .filter((genre) => genre.name !== "Anything")
          .map((genre, i) => (
            <FormControlLabel
              key={i}
              value={genre.name}
              control={
                <Checkbox
                  {...(filteredGenres.includes(genre.name) // O(n)
                    ? { defaultChecked: true }
                    : "")}
                  onChange={onFilterChange}
                />
              }
              label={genre.name}
              labelPlacement="end"
            />
          ))}
      </FormGroup>
    </div>
  );
}
