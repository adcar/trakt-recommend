import styles from "../styles/Filters.module.scss";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import genres, { flatGenres } from "../utils/genres";

interface Props {
  filteredGenres: string[];
  onFilterChange: any;
  onSelectAll: any;
}

export default function Filters({
  filteredGenres,
  onFilterChange,
  onSelectAll,
}: Props) {
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
                    ? { checked: true }
                    : { checked: false })}
                  onChange={onFilterChange}
                />
              }
              label={genre.name}
              labelPlacement="end"
            />
          ))}
      </FormGroup>
      <Button
        variant={"contained"}
        style={{ marginTop: 20 }}
        onClick={onSelectAll}
      >
        {flatGenres.length === filteredGenres.length
          ? "Deselect all"
          : "Select all"}
      </Button>
    </div>
  );
}
