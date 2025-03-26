import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";

import "./style.css";
import AnimeDetails from "./pages/Anime/AnimeDetails.jsx";
import Home from "./pages/Home/Home.jsx";
import Browse from "./pages/Browse/Browse.jsx";
import Genre from "./pages/Genre/Genre.jsx";

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
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
