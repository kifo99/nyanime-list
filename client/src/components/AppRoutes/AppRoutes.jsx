import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Watchlist from "../../pages/Watchlist/Watchlist";
import ReviewsPage from "../../pages/ReviewsPage/ReviewsPage";
import AnimeDetails from "../../pages/Anime/AnimeDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route
        path="/anime/:id"
        element={<AnimeDetails key={window.location.pathname} />}
      />
    </Routes>
  );
}
