import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Watchlist from "../../pages/Watchlist/Watchlist";
import ReviewsPage from "../../pages/ReviewsPage/ReviewsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Watchlist />} />
      <Route path="/" element={<ReviewsPage />} />
    </Routes>
  );
}
