import {
  Container,
  Box,
  List,
  ListItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useAnimeById, useUserWatchlist } from "../../Queries/api";

import useAuthStore from "../../store/useAuthStore";

export default function Watchlist() {
  const { userId } = useAuthStore();

  const { data: watchlist, watchlistIsLoading } = useUserWatchlist(userId, {
    enabled: !!userId,
  });
  const { data: anime, animeIsLoading } = useAnimeById(watchlist, {
    enabled: !!watchlist,
  });

  console.log(anime);

  if (watchlistIsLoading || animeIsLoading) {
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

  if (!anime || anime.length === 0) {
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
        <List>
          {anime.map((anime) => (
            <ListItem key={anime.anime.id}>{anime.anime.title}</ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
