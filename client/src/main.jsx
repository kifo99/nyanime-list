import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

import "./style.css";
import AnimeDetails from "./pages/Anime/AnimeDetails.jsx";
import Home from "./pages/Home/Home.jsx";
import Browse from "./pages/Browse/Browse.jsx";

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
