import { SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import variables from "../styles/variables.module.scss";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { withSessionSsr } from "../utils/withSession";
import { trakt } from "../utils/api";
import Filters from "../components/Filters";
import styles from "../styles/Dashboard.module.scss";
import { Cards } from "../components/Cards";
import { flatGenres } from "../utils/genres";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontWeightMedium: 700,
  },
  palette: {
    mode: "dark",
    primary: {
      main: variables.accent,
    },
  },
});

// TODO: In the future I can add suppoort for multiple genres in the URL. This would only be acessible via the URL but
// would be helpful in the case of bookmarking / URL sharing
export default function Dashboard({ mediaType, genre }: Props) {
  const { mutate } = useSWRConfig();
  const [type, setType] = useState(mediaType);
  const [filteredGenres, setFilteredGenres] = useState(
    genre === "Anything" ? flatGenres : [genre]
  );
  const { data, error } = useSWR(
    "/api/trakt/recommendations?type=" + type,
    fetcher
  );

  const handleChange = (event: SyntheticEvent, newType: Props["mediaType"]) => {
    setType(newType);
  };

  if (error || (data && data.success === false))
    return <div>failed to load</div>;

  function onFilterChange(e: any, checked: boolean) {
    if (checked) {
      setFilteredGenres([...filteredGenres, e.target.value]);
    } else {
      const newGenres = filteredGenres;
      newGenres.splice(filteredGenres.indexOf(e.target.value), 1);

      // Just using `setFilteredGenres(newGenres)` here wouldn't let React know that the state has changed
      setFilteredGenres([...newGenres]);
    }
  }

  function onSelectAll() {
    if (filteredGenres.length === flatGenres.length) {
      // Deselect all
      setFilteredGenres([]);
    } else {
      // Select all
      setFilteredGenres(flatGenres);
    }
  }

  async function _markAsWatched(type: string, traktId: number) {
    await fetch(
      "/api/trakt/watched?" +
        new URLSearchParams({ type, id: traktId.toString() })
    );
    const res = await fetch("/api/trakt/recommendations?type=" + type);
    return await res.json();
  }

  async function markAsWatched(type: any, traktId: any) {
    console.log("/api/trakt/recommendations?type=" + type);
    await mutate(
      "/api/trakt/recommendations?type=" + type,
      _markAsWatched(type, traktId),
      {
        optimisticData: {
          success: true,
          results: data.results.filter(
            (result: any) => result.traktId !== traktId
          ),
        },
      }
    );
  }

  async function _markAsHidden(type: string, traktId: number) {
    const response = await fetch(
      "/api/trakt/hide?" + new URLSearchParams({ type, id: traktId.toString() })
    );
    console.log("mark as hidden response", response);
    const res = await fetch("/api/trakt/recommendations?type=" + type);
    return await res.json();
  }

  async function markAsHidden(type: any, traktId: any) {
    console.log("/api/trakt/recommendations?type=" + type);
    await mutate(
      "/api/trakt/recommendations?type=" + type,
      _markAsHidden(type, traktId),
      {
        optimisticData: {
          success: true,
          results: data.results.filter(
            (result: any) => result.traktId !== traktId
          ),
        },
      }
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={"container"}>
        <div className={styles.flex}>
          <Filters
            filteredGenres={filteredGenres}
            onFilterChange={onFilterChange}
            onSelectAll={onSelectAll}
          />
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={type}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="TV Show and Movie tabs"
                >
                  <Tab label="Movies" value="movies" />
                  <Tab label="TV Shows" value="shows" />
                </TabList>
              </Box>
              <TabPanel value="movies">
                {data ? (
                  <div className={styles.movies}>
                    <Cards
                      {...{
                        data,
                        filteredGenres,
                        type: "movies",
                      }}
                      onMarkAsWatched={markAsWatched}
                      onMarkAsHidden={markAsHidden}
                    />
                  </div>
                ) : (
                  "Loading..."
                )}
              </TabPanel>
              <TabPanel value="shows">
                {data ? (
                  <div className={styles.movies}>
                    <Cards
                      {...{ data, filteredGenres, type: "shows" }}
                      onMarkAsWatched={markAsWatched}
                      onMarkAsHidden={markAsHidden}
                    />
                  </div>
                ) : (
                  "Loading..."
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

interface Props {
  mediaType: "movies" | "shows";
  genre: string;
  userInfo: any;
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }: any) {
    await trakt.import_token(req.session.token);
    return {
      props: {
        userInfo: await trakt.users.profile({ username: "me" }),
        genre: query.genre,
        mediaType: query.type,
      },
    };
  }
);
