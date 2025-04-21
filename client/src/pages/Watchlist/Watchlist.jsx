import {
  Container,
  Box,
  CircularProgress,
  List,
  Typography,
} from "@mui/material";
import { useUserWatchlist } from "../../Queries/api";

import useAuthStore from "../../store/useAuthStore";

import WatchlistAnime from "../../components/Anime/WatchlistAnime";

export default function Watchlist() {
  const { token, userId } = useAuthStore();

  const { data: watchlist, watchlistIsLoading } = useUserWatchlist(
    userId,
    token,
    {
      enabled: !!userId && token,
    }
  );

  console.log(watchlist);

  if (watchlistIsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!watchlist || watchlist.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography variant="h6">No anime in your watchlist yet.</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ backgroundColor: "white", width: "100%", maxWidth: 360 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1 className="font-bold text-3xl text-rose-600">My Watchlist</h1>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <List sx={{ width: "95%" }}>
          {watchlist.map((anime) => (
            <li key={anime.animeId}>
              <WatchlistAnime anime={anime} />
            </li>
          ))}
        </List>
      </Box>
    </Container>
  );
}
