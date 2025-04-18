import { Container, Box, List, ListItem } from "@mui/material";
import { useAnimeById, useUserWatchlist } from "../../Queries/api";

import useAuthStore from "../../store/useAuthStore";

export default function Watchlist() {
  const { userId } = useAuthStore();

  console.log(userId);

  const { data: watchlist, watchlistisLoading } = useUserWatchlist(userId, {
    enabled: !!userId,
  });
  //   const { data: anime, animeIsLoading } = useAnimeById();

  console.log(watchlist);

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
          {watchlist.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
