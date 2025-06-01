import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";

import "./style.css";
import AnimeDetails from "./pages/Anime/AnimeDetails.jsx";
import Home from "./pages/Home/Home.jsx";
import Browse from "./pages/Browse/Browse.jsx";
import Genre from "./pages/Genre/Genre.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Watchlist from "./pages/Watchlist/Watchlist.jsx";
import AddReview from "./pages/ReviewsPage/AddReview.jsx";
import ProtectedRoutes from "./components/ProtectedRouts/ProtectedRoutes.jsx";
import MyProfile from "./pages/Profile/MyProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Home />
      </App>
    ),
  },
  {
    path: "/browse",
    element: (
      <App>
        <Browse />
      </App>
    ),
  },
  {
    path: "/anime/:id",
    element: (
      <App>
        <AnimeDetails />{" "}
      </App>
    ),
  },
  {
    path: "/genre/:id",
    element: (
      <App>
        <Genre />
      </App>
    ),
  },
  {
    path: "/login",
    element: (
      <App>
        <Login />
      </App>
    ),
  },
  {
    path: "/signup",
    element: (
      <App>
        <Signup />
      </App>
    ),
  },
  {
    path: "/list/:type/:name?",
    element: (
      <ProtectedRoutes>
        <App>
          <Watchlist />
        </App>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/addReview/:animeId",
    element: (
      <ProtectedRoutes>
        <App>
          <AddReview />
        </App>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/user/:userId/profile",
    element: (
      <ProtectedRoutes>
        <App>
          <MyProfile />
        </App>
      </ProtectedRoutes>
    ),
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
